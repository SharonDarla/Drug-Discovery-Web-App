# Drug Discovery web App

### High-level architecture

- **Frontend**
    - **Tech**: React + TypeScript, Vite, Tailwind CSS, shadcn/ui + Radix UI, React Router, React Query, React Hook Form + Zod.
    - **Main pieces**:
        - `App.tsx`: sets up routing and React Query provider; routes `/` to the main page.
        - `src/pages/Index.tsx`: main UI page where you enter a SMILES string and see results.
        - `src/components/Molecule.tsx`: visualizes a molecule (3D-style representation) from structured data.
        - `src/components/TrendCard.tsx` and others: presentation components.
    - **Backend communication**: currently **no actual HTTP call is made from the frontend** for SMILES processing; it is mocked in the browser.
- **Backend**
    - **Tech**: Python + Flask, PyTorch, RDKit.
    - **Main file**: `app.py`.
        - Defines a simple PyTorch model class (`DrugModel`).
        - Loads model weights from `model.pth` (produced by the Jupyter notebook).
        - Uses RDKit to parse SMILES and create a molecule image.
        - Exposes `POST /predict` endpoint that accepts a SMILES string and returns a prediction + molecule image as base64.
    - **Current integration status**: The React frontend **does not call** this Flask endpoint yet; the client side just simulates it.
- **Database / Storage**
    - Supabase client/integration scaffolding exists under something like `src/integrations/supabase`, but:
        - The generated `types.ts` schema is effectively empty.
        - There is **no active database usage** for SMILES, predictions, or history.
    - So effectively, you can think of this as **no database in use** right now.
- **ML training / notebooks**
    - `Drug_Discovery.ipynb`:
        - Contains the model training pipeline (diffusion model / neural network).
        - Uses RDKit to convert SMILES to fingerprints (`smiles_to_fp` and similar utilities).
        - Trains `SimpleDiffusionModel` (or similar) and saves weights to `model.pth`.
    - This notebook is not part of the runtime app, but it explains how the backend model was built.

---

### What happens when you input a SMILES string? (Actual current behavior)

**All of the following is in `src/pages/Index.tsx`.**

1. **User input**
    - The SMILES text field:
        - Is a React controlled input, bound to `const [smiles, setSmiles] = useState('')`.
        - Has `id="smiles"` and a placeholder like `"e.g., CC(=O)OC1=CC=CC=C1C(=O)O"` (aspirin example).
    - When the user types, `onChange` updates the `smiles` state.
2. **User clicks “Generate” (or equivalent button)**
    - `handleGenerate()` is called.
    - Inside `handleGenerate()`:
        - It checks `if (!smiles.trim())`:
            - If empty, it shows an error toast (e.g. “Please enter a SMILES string”) and **stops**.
        - If not empty:
            - Sets `isLoading` state to `true`.
            - Instead of making a network request, it calls `setTimeout` for ~2 seconds to simulate a network delay.
3. **Mock processing**
    - After the `setTimeout` delay:
        - `isLoading` is set back to `false`.
        - It assigns a **hardcoded `sampleGeneratedMolecule`** to a state like `generatedMolecule`.
            - This is some static atom/bond data used by the `Molecule` component.
        - It then checks the user input SMILES (or name) against some hardcoded cases:
            - If the input matches specific known names (like `"sulfonamide"` or `"hydroxycyclohexylbenzimidazolethylphenylformamide"`) or patterns, it sets:
                - `moleculeImage` to a specific image file (e.g. `mol1.png.png` or `mol2.png`) from the assets.
                - `moleculeLabel` to a descriptive string from a `moleculeLabels` map.
            - Otherwise it may show a default message or generic visualization.
        - A success toast is shown indicating that generation is “complete”.
4. **Display of results**
    - The page conditionally renders:
        - If `moleculeImage` is set:
            - An `<img>` or styled component shows the molecule image.
            - Below it, the SMILES label or descriptor is displayed from `moleculeLabel`.
        - The `Molecule` component receives the `generatedMolecule` data and renders a 3D-like molecular structure in the UI.
    - No real prediction values from the ML model are used in the UI yet; it’s all based on static data / heuristics.

**Key point**: In the **current code**, from the moment you submit a SMILES string to the moment the UI updates, everything happens **entirely in the browser**, using mocked data. There is **no real call** to the Python/Flask model right now.

---

### What is the intended / designed backend flow for a SMILES input?

If you look at `app.py`, you can see what the intended production pipeline is supposed to be:

1. **Flask route**: `POST /predict`
    - Expects JSON like:
        
        ```json
        { "smiles": "CC(=O)OC1=CC=CC=C1C(=O)O" }
        ```
        
2. **Backend logic (inside `predict()` in `app.py`)**
    - Parse the JSON, extract `smiles`.
    - Validate that a SMILES string is present; return error if missing.
    - Use RDKit:
        - `Chem.MolFromSmiles(smiles)` to construct the molecule.
        - `Draw.MolToImage(mol, size=(300, 300))` to create an image (PIL image object).
        - Convert the image to bytes and then to a base64 string.
    - Use PyTorch model:
        - Convert SMILES to an appropriate input representation (usually a fingerprint, as in the notebook).
        - Run the model to get a prediction tensor (e.g., property score / activity / some numeric output).
    - Return response:
        
        ```json
        {
          "prediction": <numeric or structured value>,
          "image": "<base64-encoded PNG>"
        }
        ```
        
3. **How the frontend would ideally use this**
    - Replace the `setTimeout` in `handleGenerate()` with an actual HTTP call using `fetch` or `axios`, something like:
        
        ```tsx
        const res = await fetch("<http://localhost:5000/predict>", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ smiles }),
        });
        const data = await res.json();
        // data.prediction, data.image (base64)
        ```
        
    - Then:
        - Set `moleculeImage` to the image from `data.image` (wrapped as `data:image/png;base64,${data.image}`).
        - Set some prediction-related state based on `data.prediction`.
    - The UI would then render “real” model outputs instead of hardcoded examples.

**But again: this integration step is not implemented right now.**

---

### How the project is structured conceptually

- **Frontend (React)**
    - Responsible for:
        - UI/UX: form to input SMILES, loading indicators, toasts, cards, charts.
        - Visualizing molecules with `Molecule` and static 2D/3D assets.
        - Handling user events (submit, reset).
    - Currently in a **demo/mock state** for SMILES processing.
- **Backend (Flask + PyTorch + RDKit)**
    - Responsible for:
        - Validating and parsing SMILES (chemically).
        - Generating molecule images.
        - Running the trained ML model to get predictions.
    - Implemented but not wired up to the frontend.
- **Database / Persistence**
    - Supabase is wired for possible future use (e.g., storing history of predictions, user accounts, etc.), but:
        - No code actually writes or reads data from Supabase in the SMILES flow.
        - So, no database is part of the active SMILES input → output pipeline.

---

### Direct answer to your question

- **If you give an input SMILES string right now in the UI:**
    - It **stays in the frontend**.
    - The frontend:
        - Validates non-empty.
        - Waits 2 seconds with a simulated “API call”.
        - Then shows:
            - A hardcoded example molecule structure in the 3D viewer.
            - A preselected static image and label if your input matches known demo values.
    - **No real model inference or backend processing is involved.**
- **How it is architected / intended to work:**
    - Frontend sends the SMILES to the Flask backend (`POST /predict`).
    - Backend parses SMILES, generates an image with RDKit, runs PyTorch model, and sends back prediction + image.
    - Frontend displays the returned image and prediction metrics.

If you’d like next, I can map out exactly which lines in `Index.tsx` you would change to connect it to the Flask `/predict` endpoint, without touching any other behavior.