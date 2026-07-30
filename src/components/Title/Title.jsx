export default function Title({ title, subTitle, icon= "🐦"}) {
  return (
    <header>
      <h1 className="h1 text-center">{title} {icon}</h1>
      <h2 className="text-xl mt-4 text-center">{subTitle}</h2>
    </header>
  );
}
