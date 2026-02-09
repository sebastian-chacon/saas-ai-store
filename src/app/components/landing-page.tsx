import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Store, ShoppingCart, TrendingUp, Palette, CreditCard, BarChart3, Globe, Lock, Sparkles, Zap, Rocket } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-purple-950 to-slate-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.15),transparent_50%)]" />
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8b5cf610_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf610_1px,transparent_1px)] bg-size-[4rem_4rem]" />
      </div>

      {/* Header */}
      <header className="relative border-b border-white/10 backdrop-blur-xl bg-slate-900/30">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="relative">
              <Store className="w-8 h-8 text-purple-400" />
              <motion.div
                className="absolute inset-0 bg-purple-500/50 blur-lg"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              MiTienda
            </span>
          </motion.div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors">Características</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors">Precios</a>
            <a href="#templates" className="text-slate-300 hover:text-white transition-colors">Plantillas</a>
          </nav>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Button variant="ghost" className="text-white hover:bg-white/10">Iniciar sesión</Button>
            <Button onClick={onGetStarted} className="bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg shadow-purple-500/50">
              Comenzar gratis
            </Button>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Generación de plantillas con IA</span>
            </motion.div>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
              Crea tu tienda online{" "}
              <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                del futuro
              </span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              La plataforma más avanzada para emprendedores. Inteligencia artificial, diseño futurista y gestión simplificada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={onGetStarted} className="text-lg px-8 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg shadow-purple-500/50">
                  <Rocket className="w-5 h-5 mr-2" />
                  Comenzar gratis
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="text-lg px-8 border-white/20 text-white hover:bg-white/10">
                  <Zap className="w-5 h-5 mr-2" />
                  Ver demo
                </Button>
              </motion.div>
            </div>
            <p className="text-sm text-slate-400 mt-6">
              ✓ Sin tarjeta de crédito · ✓ 14 días gratis · ✓ Cancela cuando quieras
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-linear-to-r from-purple-600 to-cyan-600 rounded-3xl blur-2xl opacity-30" />
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl backdrop-blur-xl bg-slate-900/50">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758272423131-1cc69e29357a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBzaG9wcGluZyUyMGVjb21tZXJjZSUyMGxhcHRvcHxlbnwxfHx8fDE3NzA1NzE4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="E-commerce dashboard"
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Características del{" "}
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                futuro
              </span>
            </h2>
            <p className="text-xl text-slate-300">
              Herramientas poderosas impulsadas por inteligencia artificial
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="p-6 bg-slate-900/50 backdrop-blur-xl border-white/10 hover:border-purple-500/50 transition-all group h-full">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-14 h-14 rounded-lg bg-linear-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-purple-500/30">
                      <feature.icon className="w-7 h-7 text-purple-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-slate-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-5xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-slate-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/10 to-cyan-600/10 backdrop-blur-3xl" />
        <div className="relative container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="relative inline-block mb-6">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1531540823824-7d09de6461c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFsbCUyMGJ1c2luZXNzJTIwb3duZXIlMjBzdG9yZXxlbnwxfHx8fDE3NzA1NzE4NDN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Business owner"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-purple-500/30"
              />
              <div className="absolute -inset-2 bg-linear-to-r from-purple-600 to-cyan-600 rounded-full blur-lg opacity-50" />
            </div>
            <blockquote className="text-2xl text-white mb-6 italic leading-relaxed">
              "La generación de plantillas con IA cambió completamente mi negocio. En minutos tenía una tienda increíble funcionando."
            </blockquote>
            <div className="font-semibold text-white text-lg">María González</div>
            <div className="text-purple-300">Fundadora de Artesanías del Sur</div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold text-white mb-4">
              Planes para cada etapa
            </h2>
            <p className="text-xl text-slate-300">
              Comienza gratis y escala cuando lo necesites
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className={`p-8 h-full bg-slate-900/50 backdrop-blur-xl border-white/10 ${
                  plan.popular ? 'border-purple-500 shadow-2xl shadow-purple-500/50' : ''
                } transition-all`}>
                  {plan.popular && (
                    <div className="bg-linear-to-r from-purple-600 to-cyan-600 text-white text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                      Más popular
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-5xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-slate-400">/mes</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span className="text-slate-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={onGetStarted}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg shadow-purple-500/50'
                        : 'border-white/20 text-white hover:bg-white/10'
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-linear-to-r from-purple-600/20 to-cyan-600/20" />
        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold text-white mb-6">
              ¿Listo para el{" "}
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                futuro
              </span>
              ?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Únete a miles de emprendedores que ya están vendiendo con MiTienda
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" onClick={onGetStarted} className="text-lg px-8 bg-linear-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-lg shadow-purple-500/50">
                <Rocket className="w-5 h-5 mr-2" />
                Comenzar gratis ahora
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-slate-900/50 backdrop-blur-xl py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  MiTienda
                </span>
              </div>
              <p className="text-sm text-slate-400">
                La plataforma de e-commerce del futuro para emprendedores
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Producto</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Características</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Precios</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Plantillas</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Integraciones</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Recursos</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Ayuda</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Comunidad</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Tutoriales</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Acerca de</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contacto</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacidad</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Términos</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-sm text-center text-slate-400">
            © 2026 MiTienda. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    icon: ShoppingCart,
    title: "Catálogo de productos",
    description: "Gestiona tus productos fácilmente con imágenes, precios y variantes."
  },
  {
    icon: Palette,
    title: "Diseño personalizable",
    description: "Elige entre plantillas modernas y personaliza los colores de tu marca."
  },
  {
    icon: CreditCard,
    title: "Pagos integrados",
    description: "Acepta tarjetas, transferencias y los principales medios de pago."
  },
  {
    icon: TrendingUp,
    title: "Análisis y reportes",
    description: "Conoce tus ventas, productos más vendidos y el comportamiento de tus clientes."
  },
  {
    icon: Globe,
    title: "Envíos a todo el país",
    description: "Integración con principales empresas de logística y correos."
  },
  {
    icon: Lock,
    title: "Seguridad garantizada",
    description: "Tu tienda y los datos de tus clientes siempre protegidos con SSL."
  },
  {
    icon: BarChart3,
    title: "SEO optimizado",
    description: "Tu tienda lista para aparecer en Google y atraer más clientes."
  },
  {
    icon: Store,
    title: "Tu dominio propio",
    description: "Usa tu propio dominio o uno gratuito de MiTienda."
  }
];

const stats = [
  {
    value: "50,000+",
    label: "Tiendas activas"
  },
  {
    value: "$2M+",
    label: "Ventas procesadas"
  },
  {
    value: "99.9%",
    label: "Tiempo activo"
  },
  {
    value: "24/7",
    label: "Soporte técnico"
  }
];

const pricingPlans = [
  {
    name: "Inicial",
    price: 0,
    popular: false,
    cta: "Comenzar gratis",
    features: [
      "Hasta 10 productos",
      "Dominio mitienda.com",
      "Plantillas básicas",
      "Soporte por email",
      "Sin comisiones"
    ]
  },
  {
    name: "Profesional",
    price: 29,
    popular: true,
    cta: "Probar gratis 14 días",
    features: [
      "Productos ilimitados",
      "Dominio personalizado",
      "Todas las plantillas",
      "Soporte prioritario",
      "Sin comisiones",
      "Análisis avanzados",
      "Descuentos y cupones"
    ]
  },
  {
    name: "Empresarial",
    price: 99,
    popular: false,
    cta: "Contactar ventas",
    features: [
      "Todo de Profesional",
      "Múltiples tiendas",
      "API personalizada",
      "Soporte 24/7",
      "Gerente de cuenta",
      "Consultoría de ventas"
    ]
  }
];