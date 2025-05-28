import { Button } from "@/components/ui/button"
import {
  ChevronRight,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-1">
        <section id="pricing" className="w-full py-10 md:py-20 lg:py-30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Planes que se adaptan a tus necesidades
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                  Elige el plan que mejor se adapte a tus necesidades y comienza a ahorrar.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Básico</h3>
                  <p className="text-muted-foreground">Para hogares pequeños</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $99.990
                  <span className="ml-1 text-base font-medium text-muted-foreground">+ $22.900/mes</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>1 sensor de corriente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Monitoreo en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Historial de 3 meses</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-lime-600/40 border border-lime-500 hover:bg-lime-700">Comprar ahora</Button>
              </div>
              <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Estándar</h3>
                  <p className="text-muted-foreground">Para hogares medianos</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $249.990
                  <span className="ml-1 text-base font-medium text-muted-foreground">+ $36.900/mes</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>3 sensores de corriente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Monitoreo en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Historial de 12 meses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Recomendaciones personalizadas</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-lime-600/40 border border-lime-500 hover:bg-lime-700">Comprar ahora</Button>
              </div>
              <div className="bg-[#c1ff00]/5 border border-gray-700 rounded-2xl p-6 md:col-span-1 text-white shadow-xl">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold">Premium</h3>
                  <p className="text-muted-foreground">Para hogares grandes o negocios</p>
                </div>
                <div className="mt-4 flex items-baseline text-3xl font-bold">
                  $449.990
                  <span className="ml-1 text-base font-medium text-muted-foreground">+ $59.900/mes</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>6 sensores de corriente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Monitoreo en tiempo real</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Historial ilimitado</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Descarga de informes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Recomendaciones personalizadas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Zona de mayor consumo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-transparent p-1 border border-lime-500">
                      <ChevronRight className="h-4 w-4 text-lime-600" />
                    </div>
                    <span>Soporte prioritario</span>
                  </li>
                </ul>
                <Button className="w-full mt-8 bg-gray-600/40 border border-lime-500/50 text-gray-400 cursor-not-allowed hover:bg-gray-600/40">¡Plan que tienes!</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}