import { LayoutOutlet } from '../../../Routes/Layout'

export const AuthLayout: React.FC = () => {
  return (
    <main className="h-screen w-screen">
      <section className="bg-gray-200 h-full">
        <div className="min-h-screen flex items-center justify-center border border-gray-500">
          <section className="mx-auto">
            <LayoutOutlet />
          </section>
        </div>
      </section>
    </main>
  )
}
