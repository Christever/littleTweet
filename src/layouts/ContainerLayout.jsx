export default function ContainerLayout({children}){
    return (
        <div className="max-w-6xl mx-auto min-h-screen flex flex-col px-4 py-10">
        {children}
        </div>
    )
}