import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { 
    Crown, 
    Sparkles, 
    Shield, 
    Sword, 
    Calculator, 
    Trophy, 
    Star, 
    Zap,
    Users,
    Target,
    ChevronDown,
    ChevronUp,
    Play,
    ArrowRight,
    Gamepad2,
    Medal,
    Swords,
    ShieldPlus
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PublicLayout from '@/layouts/public-layout';
import Typewriter from '@/components/typewriter';
import { useDraggable } from '@/hooks/use-draggable';

export default function Welcome() {
    const { auth, name } = usePage<SharedData>().props;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [showTypewriter, setShowTypewriter] = useState(true);
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    // ✅ Configurar múltiples elementos draggables
    const swordDrag = useDraggable({
        initialPosition: { 
            x: typeof window !== 'undefined' ? window.innerWidth - 160 : 300, 
            y: 160 
        },
    });

    const zapDrag = useDraggable({
        initialPosition: { 
            x: 120,
            y: 140
        },
    });

    useEffect(() => {
        setIsVisible(true);
        
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrollY(currentScrollY);
            
            // ✅ Mostrar botón cuando el usuario haya hecho scroll hacia abajo
            setShowScrollToTop(currentScrollY > window.innerHeight * 0.5);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const features = [
        {
            icon: Calculator,
            title: "Matemáticas Épicas",
            description: "Resuelve problemas matemáticos en aventuras pixelart únicas",
            color: "from-purple-500 to-indigo-600"
        },
        {
            icon: Trophy,
            title: "Logros Legendarios",
            description: "Desbloquea logros y conviértete en el maestro matemático",
            color: "from-indigo-500 to-purple-600"
        },
        {
            icon: Gamepad2,
            title: "Gameplay Adictivo",
            description: "Mecánicas de juego que hacen las matemáticas divertidas",
            color: "from-purple-600 to-pink-600"
        },
        {
            icon: Users,
            title: "Multijugador",
            description: "Compite con otros héroes en desafíos matemáticos",
            color: "from-indigo-600 to-purple-500"
        }
    ];

    const stats = [
        { icon: Users, label: "Héroes Registrados", value: "10,000+" },
        { icon: Calculator, label: "Problemas Resueltos", value: "1M+" },
        { icon: Trophy, label: "Logros Desbloqueados", value: "50,000+" },
        { icon: Star, label: "Puntuación Promedio", value: "4.9/5" }
    ];

    // ✅ Función para hacer scroll suave hacia arriba
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    // ✅ Función para hacer scroll suave hacia la siguiente sección
    const scrollToNextSection = () => {
        const nextSection = document.querySelector('#features-section');
        if (nextSection) {
            nextSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        }
    };

    return (
        <PublicLayout>
            <Head title={`${name} - Aventuras Matemáticas Épicas`}>
                <meta name="description" content={`Únete a ${name} y vive aventuras épicas mientras resuelves problemas matemáticos en un mundo pixelart único`} />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
                {/* Cursor personalizado con efecto */}
                <div 
                    className="fixed w-4 h-4 bg-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
                    style={{
                        left: mousePosition.x - 8,
                        top: mousePosition.y - 8,
                        transform: `scale(${mousePosition.x > 0 ? 1.2 : 1})`
                    }}
                />

                {/* Elementos decorativos animados */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* ✅ Zap draggable (reemplaza el elemento estático) */}
                    <div 
                        ref={zapDrag.dragRef}
                        className={`absolute text-purple-300/20 transition-all duration-300 cursor-grab active:cursor-grabbing z-30 ${
                            zapDrag.isDragging ? 'scale-110 text-purple-300/40' : 'hover:text-purple-300/30 hover:scale-105'
                        }`}
                        style={{ 
                            left: zapDrag.position.x - 64, // Centrar elemento (w-32 = 128px / 2)
                            top: zapDrag.position.y - 64,
                            transform: `rotate(${
                                zapDrag.isDragging ? scrollY * 0.05 : scrollY * 0.05
                            }deg)`,
                            transition: zapDrag.isDragging ? 'none' : 'transform 1000ms'
                        }}
                        onMouseDown={zapDrag.handleMouseDown}
                        onTouchStart={zapDrag.handleTouchStart}
                    >
                        <Zap className={`w-32 h-32 transition-all ${
                            zapDrag.isDragging ? 'animate-none duration-300' : 'animate-pulse'
                        }`} />
                        
                        {/* Indicador de que es draggable */}
                        {!zapDrag.isDragging && (
                            <div className="absolute -inset-2 border-2 border-dashed border-purple-300/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-purple-300 whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                                    Arrastra el rayo ⚡
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ✅ Espada draggable (ya existente) */}
                    <div 
                        ref={swordDrag.dragRef}
                        className={`absolute text-indigo-400/20 transition-all duration-300 cursor-grab active:cursor-grabbing z-30 ${
                            swordDrag.isDragging ? 'scale-110 text-indigo-400/40' : 'hover:text-indigo-400/30 hover:scale-105'
                        }`}
                        style={{ 
                            left: swordDrag.position.x - 56,
                            top: swordDrag.position.y - 56,
                            transform: `rotate(${swordDrag.isDragging ? 45 + scrollY * 0.03 : 45 - scrollY * 0.03}deg)`,
                            transition: swordDrag.isDragging ? 'none' : 'transform 1000ms'
                        }}
                        onMouseDown={swordDrag.handleMouseDown}
                        onTouchStart={swordDrag.handleTouchStart}
                    >
                        <Sword className={`w-28 h-28 transition-all ${
                            swordDrag.isDragging ? 'animate-none duration-300' : 'animate-bounce'
                        }`} />
                        
                        {!swordDrag.isDragging && (
                            <div className="absolute -inset-2 border-2 border-dashed border-indigo-400/20 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs text-indigo-300 whitespace-nowrap bg-black/50 px-2 py-1 rounded">
                                    Arrastra la espada 🗡️
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Resto de elementos estáticos */}
                    <div 
                        className="absolute bottom-40 left-10 text-purple-300/20 transition-transform duration-1000"
                        style={{ transform: `translateY(${scrollY * 0.08}px)` }}
                    >
                        <Shield className="w-36 h-36 animate-pulse delay-1000" />
                    </div>
                    <div 
                        className="absolute bottom-20 right-32 text-indigo-400/20 transition-transform duration-1000"
                        style={{ transform: `translateY(${scrollY * -0.1}px)` }}
                    >
                        <Calculator className="w-24 h-24 animate-spin" />
                    </div>

                    {/* Partículas flotantes */}
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className={`absolute animate-pulse`}
                            style={{
                                top: `${20 + (i * 5)}%`,
                                left: `${10 + (i * 7)}%`,
                                animationDelay: `${i * 0.5}s`,
                                transform: `translateY(${scrollY * (0.02 + i * 0.01)}px)`
                            }}
                        >
                            <Sparkles className={`w-${3 + (i % 3)} h-${3 + (i % 3)} text-purple-${300 + (i % 3) * 100} opacity-60`} />
                        </div>
                    ))}

                    {/* Efectos de resplandor */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500" />
                </div>

                {/* Header */}
                <header className="relative z-20 p-6">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className={`flex items-center space-x-3 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                            <Crown className="w-10 h-10 text-purple-300 animate-pulse" />
                            <h1 className="text-3xl font-bold text-white">{ name }</h1>
                        </div>
                        
                        <div className={`flex items-center space-x-4 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                            {auth.user ? (
                                <Link href={route('dashboard')}>
                                    <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                                        <Shield className="w-4 h-4 mr-2" />
                                        Dashboard
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')}>
                                        <Button variant="ghost" className="cursor-pointer text-purple-200 hover:text-white hover:bg-purple-600/20 px-4 py-2 rounded-xl transition-all duration-300">
                                            Iniciar Sesión
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                                            <Crown className="w-4 h-4 mr-2" />
                                            Únete Ahora
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="relative z-10">
                    <section className="min-h-screen flex items-center justify-center px-6 relative">
                        <div className="max-w-6xl mx-auto text-center">
                            {/* Título principal con animación espectacular */}
                            <div className={`mb-8 transition-all duration-1500 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                                <div className="flex items-center justify-center mb-6">
                                    <Swords className="w-16 h-16 text-purple-300 animate-pulse mr-4" />
                                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold">
                                        <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent animate-pulse">
                                            { name }
                                        </span>
                                    </h1>
                                    <ShieldPlus className="w-16 h-16 text-indigo-300 animate-pulse ml-4" />
                                </div>
                                
                                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    Aventuras{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Matemáticas
                                    </span>
                                    {' '}Épicas
                                </h2>
                                
                                <div className="text-xl md:text-2xl text-purple-200 mb-8 max-w-3xl mx-auto leading-relaxed min-h-[120px] flex items-center justify-center">
                                    {showTypewriter && (
                                        <Typewriter 
                                            text="Sumérgete en un mundo pixelart único donde las matemáticas se convierten en aventuras épicas. Resuelve problemas, desbloquea poderes y conviértete en el héroe matemático definitivo."
                                            speed={50}
                                            className="text-xl md:text-2xl text-purple-200 leading-relaxed"
                                        />
                                    )}
                                </div>
                            </div>

                            {/* Botones de acción */}
                            <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 transition-all duration-1500 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                                {!auth.user && (
                                    <Link href={route('register')}>
                                        <Button className="cursor-pointer bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group">
                                            <Play className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                                            Comenzar Aventura
                                            <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                )}
                                
                                <Button 
                                    variant="outline" 
                                    className="cursor-pointer border-2 border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm"
                                >
                                    <Target className="w-6 h-6 mr-3" />
                                    Ver Demo
                                </Button>
                            </div>

                            {/* Indicador de scroll */}
                            <div 
                                className={`animate-bounce cursor-pointer transition-all duration-1500 delay-700 hover:scale-110 hover:text-purple-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                                onClick={scrollToNextSection}
                            >
                                <ChevronDown className="w-8 h-8 text-purple-300 mx-auto hover:animate-pulse" />
                                <p className="text-purple-300 text-sm mt-2">Descubre más</p>
                            </div>
                        </div>
                    </section>

                    {/* ✅ Features Section con ID para el scroll */}
                    <section id="features-section" className="py-20 px-6 bg-black/20 backdrop-blur-sm">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    ¿Por qué elegir{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                                        { name }
                                    </span>
                                    ?
                                </h3>
                                <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                                    Descubre las características que hacen de { name } la experiencia definitiva para aprender matemáticas
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {features.map((feature, index) => (
                                    <div 
                                        key={index}
                                        className="group bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                                        style={{
                                            animationDelay: `${index * 0.2}s`
                                        }}
                                    >
                                        <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:animate-pulse transition-all duration-300`}>
                                            <feature.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors">
                                            {feature.title}
                                        </h4>
                                        <p className="text-purple-200 group-hover:text-purple-100 transition-colors">
                                            {feature.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Stats Section */}
                    <section className="py-20 px-6">
                        <div className="max-w-6xl mx-auto">
                            <div className="text-center mb-16">
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    Números que{' '}
                                    <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                        Impresionan
                                    </span>
                                </h3>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                                {stats.map((stat, index) => (
                                    <div 
                                        key={index}
                                        className="text-center group"
                                    >
                                        <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:animate-bounce">
                                            <stat.icon className="w-10 h-10 text-white" />
                                        </div>
                                        <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                                            {stat.value}
                                        </div>
                                        <div className="text-purple-300 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="py-20 px-6 bg-gradient-to-r from-purple-800/50 to-indigo-800/50 backdrop-blur-sm">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="mb-8">
                                <Medal className="w-24 h-24 text-purple-300 mx-auto mb-6 animate-pulse" />
                                <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                    ¿Listo para la{' '}
                                    <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        Aventura
                                    </span>
                                    ?
                                </h3>
                                <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
                                    Únete a miles de héroes que ya están viviendo aventuras matemáticas épicas. 
                                    Tu leyenda comienza aquí.
                                </p>
                            </div>

                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                                    <Link href={route('register')}>
                                        <Button className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/50 group">
                                            <Crown className="w-6 h-6 mr-3 group-hover:animate-spin" />
                                            Crear mi Leyenda
                                            <Sparkles className="w-6 h-6 ml-3 group-hover:animate-pulse" />
                                        </Button>
                                    </Link>
                                    
                                    <Link href={route('login')}>
                                        <Button 
                                            variant="outline" 
                                            className="border-2 border-purple-400 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 bg-white/10 backdrop-blur-sm"
                                        >
                                            <Shield className="w-6 h-6 mr-3" />
                                            Ya soy un Héroe
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="relative z-10 py-12 px-6 bg-black/40 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto text-center">
                        <div className="flex items-center justify-center mb-6">
                            <Crown className="w-8 h-8 text-purple-300 mr-3 animate-pulse" />
                            <h4 className="text-2xl font-bold text-white">{ name }</h4>
                            <Crown className="w-8 h-8 text-purple-300 ml-3 animate-pulse" />
                        </div>
                        <p className="text-purple-300 mb-4">
                            Transformando las matemáticas en aventuras épicas desde 2024
                        </p>
                        <div className="flex items-center justify-center space-x-4 text-purple-400">
                            <Sparkles className="w-5 h-5 animate-pulse" />
                            <span className="text-sm">Hecho con ❤️ para futuros héroes matemáticos</span>
                            <Sparkles className="w-5 h-5 animate-pulse" />
                        </div>
                    </div>
                </footer>

                <div className="fixed bottom-6 right-6 z-50">
                    <button
                        onClick={scrollToTop} 
                        className={`
                            cursor-pointer relative bg-gradient-to-r overflow-hidden from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 
                            text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 border-2 
                            border-purple-400 backdrop-blur-sm ${showScrollToTop ? 'size-14' : 'size-0 !p-0 !border-0'}    
                        `}
                        aria-label="Subir hacia arriba"
                    >
                        <ChevronUp className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 size-8 transition-all duration-300" />
                    </button>
                </div>
            </div>
        </PublicLayout>
    );
}
