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
- ntegration with Marvin JS for interactive 2D molecular visualization and editing.


🧰 Technologies Used
Diffusion Models: Implemented using PyTorch to learn and generate molecular structures from SMILES data.

Molecular Editor: Integrated using Marvin JS for interactive molecule editing.

Frontend: Built with React.js for a responsive and dynamic user interface.

Backend: Utilizes Flask to handle API requests and model inference.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
