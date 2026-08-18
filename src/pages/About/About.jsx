import { Card } from "primereact/card";
import Title from "@/components/common/Title/Title";

export default function About() {
  return (
    <div className="mt-6 max-w-4xl mx-auto mb-10">
      <Title
        title="À propos de LittleTweet"
        subTitle="Un petit réseau social... fait maison 🐦"
      />

      {/* Présentation */}
      <Card className="mt-10 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-2xl font-semibold text-teal-400 mb-4">
          LittleTweet
        </h2>

        <div className="text-slate-300 space-y-4 leading-relaxed">
          <p>
            LittleTweet est un petit réseau social développé comme projet
            personnel, inspiré des réseaux sociaux comme Twitter / X, réalisé
            dans le cadre de la formation Believemy, .
          </p>

          <p>
            L'objectif n'est pas de reproduire Twitter à l'identique, mais de
            construire progressivement une application complète tout en
            expérimentant différentes technologies du développement web moderne.
          </p>

          <p>
            Le projet évolue petit à petit avec l'ajout de nouvelles
            fonctionnalités : profils, tweets, réponses, likes, avatars et bien
            d'autres à venir.
          </p>
        </div>
      </Card>

      {/* Projet Believemy */}
      <Card className="mt-6 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <a
            href="https://believemy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0"
          >
            <img
              src="images/logo.png"
              alt="Believemy"
              className="w-40 h-auto"
            />
          </a>

          <div>
            <h2 className="text-2xl font-semibold text-teal-400 mb-3">
              Un projet réalisé dans le cadre de Believemy
            </h2>

            <p className="text-slate-300 leading-relaxed">
              LittleTweet est un projet réalisé dans le cadre de la formation
              Believemy, dans le cadre du Projet Passerelle 3.
            </p>

            <p className="text-slate-400 mt-3 leading-relaxed">
              Ce projet permet de mettre en pratique les connaissances acquises
              au cours de la formation en développant une application web
              complète.
            </p>
          </div>
        </div>
      </Card>

      {/* Fonctionnalités */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-teal-400 mb-5">
          Fonctionnalités
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="text-3xl mb-3">👤</div>

            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Comptes utilisateurs
            </h3>

            <p className="text-slate-400">
              Inscription, connexion et gestion du profil avec personnalisation
              de l'avatar.
            </p>
          </Card>

          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="text-3xl mb-3">🐦</div>

            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Tweets
            </h3>

            <p className="text-slate-400">
              Création et affichage des tweets dans un fil mis à jour en temps
              réel.
            </p>
          </Card>

          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="text-3xl mb-3">💬</div>

            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Réponses
            </h3>

            <p className="text-slate-400">
              Possibilité de répondre aux tweets et d'afficher les réponses
              directement sous les publications.
            </p>
          </Card>

          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="text-3xl mb-3">❤️</div>

            <h3 className="text-xl font-semibold text-slate-100 mb-2">Likes</h3>

            <p className="text-slate-400">
              Les utilisateurs peuvent aimer un tweet et retirer leur like à
              tout moment.
            </p>
          </Card>
        </div>
      </section>

      {/* Technologies */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-teal-400 mb-5">
          Technologies utilisées
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Frontend
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <strong className="text-teal-400">React</strong>
                {" — "}construction de l'interface et des composants.
              </li>

              <li>
                <strong className="text-teal-400">Vite</strong>
                {" — "}environnement de développement et build.
              </li>

              <li>
                <strong className="text-teal-400">React Router</strong>
                {" — "}gestion des différentes pages et routes.
              </li>

              <li>
                <strong className="text-teal-400">Tailwind CSS</strong>
                {" — "}mise en forme et responsive design.
              </li>

              <li>
                <strong className="text-teal-400">PrimeReact</strong>
                {" — "}composants d'interface utilisateur.
              </li>
            </ul>
          </Card>

          <Card className="bg-slate-900 border border-slate-800 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-100 mb-4">
              Données et authentification
            </h3>

            <ul className="space-y-3 text-slate-300">
              <li>
                <strong className="text-teal-400">
                  Firebase Authentication
                </strong>
                {" — "}gestion des comptes et de l'authentification.
              </li>

              <li>
                <strong className="text-teal-400">
                  Firebase Realtime Database
                </strong>
                {" — "}stockage et synchronisation des données en temps réel.
              </li>

              <li>
                <strong className="text-teal-400">React Hook Form</strong>
                {" — "}gestion des formulaires.
              </li>

              <li>
                <strong className="text-teal-400">Zod</strong>
                {" — "}validation des données saisies.
              </li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Architecture */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-teal-400 mb-5">
          Quelques choix techniques
        </h2>

        <Card className="bg-slate-900 border border-slate-800 rounded-xl">
          <div className="space-y-5 text-slate-300 leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                ⚡ Données en temps réel
              </h3>

              <p>
                Les tweets, les réponses et les profils utilisent les
                possibilités temps réel de Firebase. Les modifications sont
                ainsi automatiquement répercutées dans l'interface.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                🔐 Authentification
              </h3>

              <p>
                Firebase Authentication prend en charge la connexion des
                utilisateurs tandis que les informations complémentaires du
                profil sont stockées dans la base de données.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                🧩 Architecture par composants
              </h3>

              <p>
                L'application est organisée autour de composants réutilisables,
                de hooks personnalisés et de services dédiés à l'accès aux
                données.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-1">
                🛡️ Routes protégées
              </h3>

              <p>
                Certaines pages sont réservées aux utilisateurs connectés grâce
                à un système de routes protégées.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Conclusion */}
      <Card className="mt-10 bg-slate-900 border border-slate-800 rounded-xl">
        <h2 className="text-2xl font-semibold text-teal-400 mb-4">
          Un projet en évolution
        </h2>

        <p className="text-slate-300 leading-relaxed">
          LittleTweet est un projet qui évolue progressivement. De nouvelles
          fonctionnalités seront ajoutées au fil du développement, avec
          l'objectif de continuer à expérimenter, apprendre et améliorer
          l'application.
        </p>

        <p className="text-slate-400 mt-4">
          Merci d'avoir pris le temps de découvrir LittleTweet 🐦
        </p>
      </Card>
    </div>
  );
}
