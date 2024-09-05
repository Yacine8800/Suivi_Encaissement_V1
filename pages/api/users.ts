import fs from "fs";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";

// Définir le chemin du fichier JSON
const FILE_PATH = path.join(process.cwd(), "data", "users.json");

// Définir le type User
interface User {
  name: string;
  prenom: string;
  email: string;
  number: string;
  matricule: string;
  profil: string;
  dr: { value: string; label: string }[];
  secteur: { value: string; label: string }[];
}

// Type pour la requête et la réponse
type Data = { message: string; error?: string };
type UserResponse = User[] | Data;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse>
) {
  if (req.method === "POST") {
    const { user }: { user: User } = req.body;

    try {
      // Vérifier si le fichier JSON existe, sinon le créer
      if (!fs.existsSync(FILE_PATH)) {
        fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      }

      // Lire les utilisateurs existants
      const data = fs.readFileSync(FILE_PATH, "utf8");
      const users: User[] = JSON.parse(data);

      // Vérifier les doublons
      const emailExists = users.some((u) => u.email === user.email);
      const phoneExists = users.some((u) => u.number === user.number);
      const matriculeExists = users.some((u) => u.matricule === user.matricule);

      if (emailExists) {
        return res.status(400).json({
          message: "Email déjà utilisé.",
        });
      }
      if (phoneExists) {
        return res.status(400).json({
          message: "Téléphone déjà utilisé.",
        });
      }
      if (matriculeExists) {
        return res.status(400).json({
          message: "Matricule déjà utilisé.",
        });
      }

      // Ajouter le nouvel utilisateur
      users.push(user);

      // Sauvegarder les utilisateurs mis à jour dans le fichier JSON
      fs.writeFileSync(FILE_PATH, JSON.stringify(users, null, 2));

      return res
        .status(200)
        .json({ message: "Utilisateur ajouté avec succès." });
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de l'utilisateur :",
        error
      );
      return res.status(500).json({
        message: "Erreur lors de l'enregistrement de l'utilisateur",
        error: (error as Error).message,
      });
    }
  } else if (req.method === "GET") {
    try {
      // Vérifier si le fichier JSON existe
      if (!fs.existsSync(FILE_PATH)) {
        return res.status(200).json([]);
      }

      // Lire les utilisateurs existants
      const data = fs.readFileSync(FILE_PATH, "utf8");
      const users: User[] = JSON.parse(data);

      return res.status(200).json(users);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
      return res.status(500).json({
        message: "Erreur lors du chargement des utilisateurs",
        error: (error as Error).message,
      });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    return res
      .status(405)
      .json({ message: `Méthode ${req.method} non autorisée` });
  }
}
