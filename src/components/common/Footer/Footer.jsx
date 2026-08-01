export default function Footer() {
  return (
    <footer className="grid md:grid-cols-3 gap-6 border-t border-slate-800 pt-6 ">
      <div className="flex flex-col items-center">
        <p className="text-lg text-teal-400 text-center">💬 Publiez</p>
        <p className="text-sm text-slate-400 text-center">
          Partagez vos pensées avec vos abonnés
        </p>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-lg text-teal-400 text-center">❤️ Interagissez</p>
        <p className="text-sm text-slate-400 text-center">
          Réagissez aux messages
        </p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="text-lg text-teal-400 text-center"> 👥 Découvrez</p>
        <p className="text-sm text-slate-400 text-center">
          Suivez des personnes intéressantes
        </p>
      </div>
    </footer>
  );
}
