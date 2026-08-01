import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import Title from "@/components/Title/Title";

export default function ErrorPage() {

    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="text-center">

                <Title
                    title="Erreur 404"
                    subTitle="Cette page semble avoir pris son envol"
                />

                <p className="mt-8 text-slate-400 text-lg">
                    La page que vous recherchez a peut-être été supprimée,
                    déplacée ou n'existe plus.
                </p>


                <Button
                    label="Retour à l'accueil"
                    icon="pi pi-home"
                    className="mt-8 bg-teal-600 hover:bg-teal-700 border-none"
                    onClick={() => navigate("/")}
                />

            </div>

        </div>
    );
}
