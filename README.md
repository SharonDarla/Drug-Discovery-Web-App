## Drug Molecule Generator with Diffusion Model

# Introduction:
This project presents a web-based platform that integrates a diffusion model trained on SMILES data to generate novel drug-like molecules. It also features an interactive molecular editor, allowing users to visualize and modify generated molecules seamlessly.

🚀 Features
SMILES-Based Diffusion Model: Generates novel molecular structures by learning from a dataset of SMILES representations.

Molecular Editor Integration: Allows users to edit and visualize molecules in real-time.

Interactive Visualization: Provides a user-friendly interface to explore and manipulate molecular structures.
The platform is designed for researchers, chemists, and drug developers who need tools for de novo molecule generation and exploration. It combines modern machine learning with cheminformatics to enable creative and efficient molecular design in a web interface.

# Project Description:
The core idea behind this project is to use diffusion models to learn patterns from existing molecular structures encoded as SMILES strings . Once trained, the model can generate new, plausible, and potentially drug-like molecules that can be further explored and modified using a molecular editor embedded in the application.

The platform includes:

- A PyTorch-based diffusion model trained on SMILES data.
- A Flask backend that serves API endpoints for model inference.
- A React frontend providing a responsive UI for molecule generation and editing.
- Integration with Marvin JS for interactive 2D molecular visualization and editing.

# Architecture Overview:

```            
     Frontend      <------>    Flask / Python     <------>     Supabase      
  (React/Vite)       HTTP     (Model Inference)     REST    (DB/Auth/Storage)

```   

1. Frontend talks to Flask API to generate molecules.
2. Flask API runs the PyTorch model , generates SMILES.
3. Flask API can then send results to Supabase for storage.
4. Supabase also handles user authentication and data persistence


# Features:

* Diffusion-Based Molecule Generation - Uses a PyTorch-trained diffusion model to generate novel SMILES strings representing plausible drug-like molecules.
* Interactive Molecular Editor - Integrates Marvin JS or similar tools to let users visually edit generated molecules.
* Real-Time Visualization - Instantly renders molecular structures in 2D from SMILES input.
* User Authentication - Powered by Supabase Auth for secure login/signup functionality.
* Molecule Storage - Stores generated molecules in Supabase (PostgreSQL) for future retrieval.
* Python Backend - Flask API handles model inference, preprocessing, and integration with Supabase.
* Modular Architecture - Separated frontend, backend, and database layers for flexibility and scalability.

# Input, Running & Output:

* Input:
      - User inputs seed value or molecule properties via UI.
      - Request sent to Flask backend via REST API.
* Running:
      - Flask receives request and runs inference using PyTorch diffusion model.
      - Generated SMILES string is returned to frontend.
      - Molecule is rendered using Marvin JS or similar visualization tool.
* Output:
      - Displayed SMILES representation.
      - Interactive 2D molecule viewer.
      - Option to edit molecule and re-generate or save it to Supabase.



# Technologies Used

- Frontend

1. React.js - Component-based UI architecture
2. Vite - Fast build tool for React apps
3. TypeScript - Type-safe JavaScript development
4. Tailwind CSS -Utility-first styling framework
5. shadcn-ui - UI component library built on Tailwind
6. Axios/Fetch API - Communicate with Flask backend
7. Marvin JS - Interactive molecular structure drawing and editing

- Backend (Flask/Python)
  
1. Python - Main language for backend logic
2. Flask - Lightweight API server for handling model inference
3. PyTorch - Train and run diffusion model
4. RDKit - SMILES parsing, validation, and chemical property calculation
5. Jupyter Notebook (Drug_Discovery.ipynb) - For model training and experimentation

- Supabase (Backend-as-a-Service) - for Auth, Database (PostgreSQL)

- Deployed using netlify

# Future Roadmap
- Add support for 3D molecule visualization
- Allow user-uploaded datasets for fine-tuning
- Export molecules in multiple formats (SDF, PDB, etc.)

- Contributions are welcome :)
- feel free to open an issue or submit a pull request.
