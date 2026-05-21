from flask import Flask, request, jsonify
import torch
from rdkit import Chem
from rdkit.Chem import Draw
from io import BytesIO
import base64

app = Flask(__name__)

# Load your trained PyTorch model
class DrugModel(torch.nn.Module):
    def __init__(self):
        super(DrugModel, self).__init__()
        # define layers matching your training architecture
        self.linear = torch.nn.Linear(100, 1)  # Placeholder

    def forward(self, x):
        return self.linear(x)

model = DrugModel()
model.load_state_dict(torch.load("model.pth", map_location=torch.device('cpu')))
model.eval()

# Utility: Generate image from SMILES
def smiles_to_image(smiles: str) -> str:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        return None
    img = Draw.MolToImage(mol, size=(300, 300))
    buf = BytesIO()
    img.save(buf, format="PNG")
    return base64.b64encode(buf.getvalue()).decode("utf-8")

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    smiles = data.get("smiles")

    if not smiles:
        return jsonify({"error": "SMILES not provided"}), 400

    try:
        # Convert SMILES to input tensor (placeholder logic)
        input_tensor = torch.rand(1, 100)  # Replace with real featurization

        with torch.no_grad():
            output = model(input_tensor)

        image_base64 = smiles_to_image(smiles)
        if not image_base64:
            return jsonify({"error": "Invalid SMILES"}), 400

        return jsonify({
            "prediction": output.item(),
            "image": image_base64
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
