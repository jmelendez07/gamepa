import Hero from "@/types/hero";
import { useState, useRef, useEffect } from "react";
import { Head, router } from "@inertiajs/react";
import { Card, CardContent } from "@/components/ui/card";
import * as PIXI from 'pixi.js';
import { 
    Crown, 
    Heart, 
    ChevronRight,
    ChevronLeft,
    Sparkles,
    Image as ImageIcon
} from "lucide-react";

interface ISelectionHeroProps {
    heroes: Hero[];
}

export default function SelectionHero({ heroes }: ISelectionHeroProps) {
    const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [pixiInitialized, setPixiInitialized] = useState(false);
    const pixiContainerRef = useRef<HTMLDivElement>(null);
    const pixiAppRef = useRef<PIXI.Application | null>(null);
    const heroSpriteRef = useRef<PIXI.Sprite | null>(null);

    // Mover getCurrentHero al inicio para que esté disponible en todas las funciones
    const getCurrentHero = () => {
        return heroes[currentIndex];
    };

    // Función para inicializar PixiJS para la imagen del héroe
    const initializeHeroSprite = async () => {
        const currentHero = getCurrentHero();
        if (!pixiContainerRef.current || !currentHero?.spritesheet) return;

        console.log('Inicializando sprite para héroe:', currentHero.name, 'Spritesheet:', currentHero.spritesheet);

        try {
            // Limpiar aplicación anterior si existe
            if (pixiAppRef.current) {
                pixiAppRef.current.destroy(true);
                pixiAppRef.current = null;
                setPixiInitialized(false);
            }

            // Crear nueva aplicación PixiJS
            const app = new PIXI.Application();
            await app.init({
                width: 400,
                height: 300,
                backgroundColor: 0x000000,
                backgroundAlpha: 0,
                antialias: true,
                resolution: window.devicePixelRatio || 1,
                autoDensity: true,
            });

            pixiAppRef.current = app;
            
            // Limpiar el contenedor antes de agregar el nuevo canvas
            if (pixiContainerRef.current) {
                pixiContainerRef.current.innerHTML = '';
                pixiContainerRef.current.appendChild(app.canvas);
            }

            console.log('Cargando textura:', currentHero.spritesheet);

            // Cargar la textura del héroe
            const texture = await PIXI.Assets.load(currentHero.spritesheet);
            console.log('Textura cargada exitosamente:', texture);

            const heroSprite = new PIXI.Sprite(texture);

            // Configuración simplificada para que sea visible
            console.log('Dimensiones originales del sprite:', heroSprite.width, 'x', heroSprite.height);
            
            // Centrar el sprite en el contenedor
            heroSprite.anchor.set(0.5, 0.5);
            heroSprite.x = 200; // Centro horizontal del canvas (400/2)
            heroSprite.y = 150; // Centro vertical del canvas (300/2)
            
            // Escalar para que ocupe un buen tamaño en el contenedor
            const containerWidth = 400;
            const containerHeight = 300;
            
            // Calcular escala para que el sprite sea visible pero no demasiado grande
            const maxWidth = containerWidth * 0.8; // 80% del ancho del contenedor
            const maxHeight = containerHeight * 0.8; // 80% del alto del contenedor
            
            const scaleX = 1;
            const scaleY = 1;
            const scale = Math.min(scaleX, scaleY); // Usar min para que quepa completamente
            
            heroSprite.scale.set(scale);
            
            console.log('Escala aplicada:', scale);
            console.log('Posición final:', heroSprite.x, heroSprite.y);
            console.log('Tamaño final:', heroSprite.width, 'x', heroSprite.height);

            // Hacer el sprite interactivo
            heroSprite.eventMode = 'static';
            heroSprite.cursor = 'pointer';

            // Agregar efectos hover
            heroSprite.on('pointerenter', () => {
                if (!isTransitioning) {
                    heroSprite.scale.set(scale * 1.1);
                }
            });

            heroSprite.on('pointerleave', () => {
                if (!isTransitioning) {
                    heroSprite.scale.set(scale);
                }
            });

            // Agregar al stage
            app.stage.addChild(heroSprite);
            heroSpriteRef.current = heroSprite;

            // Aplicar efectos de transición si está en transición
            if (isTransitioning) {
                heroSprite.scale.set(scale * 1.1);
                const blurFilter = new PIXI.BlurFilter();
                blurFilter.blur = 2;
                heroSprite.filters = [blurFilter];
            }

            setPixiInitialized(false);
            console.log('Sprite inicializado correctamente y agregado al stage');

        } catch (error) {
            console.error('Error loading hero sprite:', error);
            // Mostrar placeholder si hay error
            showPlaceholderSprite();
        }
    };

    // Función para mostrar placeholder cuando falla la carga
    const showPlaceholderSprite = async () => {
        if (!pixiContainerRef.current) return;

        console.log('Mostrando placeholder sprite');

        try {
            // Si no hay app, crear una temporal para el placeholder
            if (!pixiAppRef.current) {
                const app = new PIXI.Application();
                await app.init({
                    width: 400,
                    height: 300,
                    backgroundColor: 0x8B5CF6,
                    backgroundAlpha: 1,
                    antialias: true,
                });
                pixiAppRef.current = app;
                pixiContainerRef.current.innerHTML = '';
                pixiContainerRef.current.appendChild(app.canvas);
            }

            const app = pixiAppRef.current;
            
            // Limpiar sprite anterior
            app.stage.removeChildren();

            // Crear un rectángulo de placeholder
            const placeholder = new PIXI.Graphics();
            placeholder.beginFill(0x8B5CF6);
            placeholder.drawRoundedRect(0, 0, 400, 300, 8);
            placeholder.endFill();

            // Agregar ícono de imagen
            const iconText = new PIXI.Text('🖼️', {
                fontSize: 48,
                fill: 0xFFFFFF,
                align: 'center'
            });
            iconText.anchor.set(0.5);
            iconText.x = 200;
            iconText.y = 150;

            app.stage.addChild(placeholder);
            app.stage.addChild(iconText);

            setPixiInitialized(true);

        } catch (error) {
            console.error('Error creating placeholder:', error);
        }
    };

    // Actualizar sprite cuando cambia el héroe
    useEffect(() => {
        console.log('useEffect disparado - currentIndex:', currentIndex, 'héroe actual:', getCurrentHero());
        
        // Agregar un pequeño delay para asegurar que el DOM esté listo
        const timer = setTimeout(() => {
            const currentHero = getCurrentHero();
            console.log('Verificando héroe después del timeout:', currentHero);
            
            if (currentHero?.spritesheet) {
                console.log('Iniciando carga de sprite para:', currentHero.name);
                initializeHeroSprite();
            } else {
                console.log('No hay spritesheet, mostrando placeholder');
                showPlaceholderSprite();
            }
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [currentIndex]);

    // Aplicar efectos de transición por separado
    useEffect(() => {
        if (heroSpriteRef.current && pixiInitialized) {
            const sprite = heroSpriteRef.current;
            
            if (isTransitioning) {
                // Aplicar efectos de transición
                sprite.scale.set(sprite.scale.x * 1.1);
                const blurFilter = new PIXI.BlurFilter();
                blurFilter.blur = 2;
                sprite.filters = [blurFilter];
            } else {
                // Remover efectos
                sprite.scale.set(sprite.scale.x / 1.1);
                sprite.filters = [];
            }
        }
    }, [isTransitioning, pixiInitialized]);

    // Cleanup al desmontar
    useEffect(() => {
        return () => {
            if (pixiAppRef.current) {
                pixiAppRef.current.destroy(true);
                pixiAppRef.current = null;
            }
        };
    }, []);

    const handleSelectHero = async (hero: Hero) => {
        setIsLoading(true);
        try {
            router.post('/heroes/seleccionar', {
                id: hero.id
            });
        } catch (error) {
            console.error('Error selecting hero:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getHealthColor = (health: number) => {
        if (health >= 80) return 'from-green-400 to-green-600';
        if (health >= 60) return 'from-yellow-400 to-yellow-600';
        if (health >= 40) return 'from-orange-400 to-orange-600';
        return 'from-red-400 to-red-600';
    };

    // Calcular la vida máxima de todos los héroes disponibles
    const getMaxHealth = () => {
        if (heroes.length === 0) return 100;
        return Math.max(...heroes.map(hero => hero.health));
    };

    const nextSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === heroes.length - 1 ? 0 : prevIndex + 1
            );
            setTimeout(() => setIsTransitioning(false), 50);
        }, 150);
    };

    const prevSlide = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        
        setTimeout(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === 0 ? heroes.length - 1 : prevIndex - 1
            );
            setTimeout(() => setIsTransitioning(false), 50);
        }, 150);
    };

    const goToSlide = (index: number) => {
        if (isTransitioning || index === currentIndex) return;
        setIsTransitioning(true);
        
        setTimeout(() => {
            setCurrentIndex(index);
            setTimeout(() => setIsTransitioning(false), 50);
        }, 150);
    };

    return (
        <>
            <Head title="Selección de Héroe" />
            
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-purple-100/30"></div>
                    <div className="relative px-6 py-8">
                        <div className="max-w-7xl mx-auto text-center">
                            <div className="flex items-center justify-center mb-4">
                                <Crown className="w-8 h-8 text-purple-600 mr-3" />
                                <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
                                    Elige tu Héroe
                                </h1>
                                <Crown className="w-8 h-8 text-purple-600 ml-3" />
                            </div>
                            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                                Selecciona tu campeón y comienza tu aventura épica
                            </p>
                        </div>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full">
                        <Sparkles className="absolute top-10 left-10 w-6 h-6 text-purple-500 animate-pulse" />
                        <Sparkles className="absolute top-20 right-20 w-4 h-4 text-purple-400 animate-pulse delay-1000" />
                        <Sparkles className="absolute bottom-10 left-1/4 w-5 h-5 text-purple-600 animate-pulse delay-500" />
                    </div>
                </div>

                <div className="px-6 py-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative">
                            {heroes.length > 1 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        disabled={isTransitioning}
                                        className={`absolute cursor-pointer left-4 top-1/2 -translate-y-1/2 z-10 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                                            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <ChevronLeft className="w-6 h-6" />
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        disabled={isTransitioning}
                                        className={`absolute cursor-pointer right-4 top-1/2 -translate-y-1/2 z-10 bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 ${
                                            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                    >
                                        <ChevronRight className="w-6 h-6" />
                                    </button>
                                </>
                            )}

                            <div className="flex justify-center">
                                <div className={`transition-all duration-300 ease-in-out ${
                                    isTransitioning 
                                        ? 'opacity-0 scale-95 translate-y-4' 
                                        : 'opacity-100 scale-100 translate-y-0'
                                }`}>
                                    {getCurrentHero() && (
                                        <Card
                                            key={getCurrentHero().id}
                                            className={`group relative py-0 overflow-hidden transition-all duration-500 aspect-[16/18] cursor-pointer transform hover:scale-105 hover:shadow-2xl border-2 bg-gradient-to-br from-purple-600 to-purple-800 w-80 md:w-96 lg:w-[400px] 2xl:w-[600px] ${
                                                selectedHero?.id === getCurrentHero().id 
                                                    ? 'border-purple-300 shadow-purple-400/50 shadow-xl ring-2 ring-purple-300' 
                                                    : 'border-purple-500 hover:border-purple-400 hover:shadow-purple-500/30'
                                            } ${isTransitioning ? 'pointer-events-none' : ''}`}
                                            onClick={() => setSelectedHero(getCurrentHero())}
                                        >
                                            <CardContent className="p-0 h-full grid grid-rows-[1fr_auto]">
                                                <div className="relative overflow-hidden">
                                                    {/* Gradiente de fondo siempre visible */}
                                                    <div className={`absolute inset-0 bg-gradient-to-t ${getHealthColor(getCurrentHero().health)} transition-opacity duration-300 ${
                                                        pixiInitialized ? 'opacity-100' : 'opacity-50'
                                                    }`}>
                                                        <div className="absolute inset-0 bg-black/40"></div>
                                                    </div>
                                                    
                                                    {/* Contenedor PixiJS con fallback */}
                                                    <div 
                                                        ref={pixiContainerRef}
                                                        className={`w-full h-full absolute inset-0 transition-opacity duration-300 ${
                                                            pixiInitialized ? 'opacity-100' : 'opacity-0'
                                                        }`}
                                                    />

                                                    {/* Loading indicator mientras PixiJS se inicializa */}
                                                    {!pixiInitialized && (
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            <div className="text-white text-8xl animate-pulse">
                                                                ⚔️
                                                            </div>
                                                        </div>
                                                    )}

                                                    {selectedHero?.id === getCurrentHero().id && (
                                                        <div className="absolute inset-0 bg-white/20 flex items-center justify-center z-10">
                                                            <div className="bg-purple-600/90 rounded-full p-2">
                                                                <Crown className="w-8 h-8 text-white" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-6 bg-gradient-to-b from-purple-700 to-purple-900">
                                                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors">
                                                        {getCurrentHero().name}
                                                    </h3>
                                                    
                                                    <div className="mb-4">
                                                        <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                                                            <span className="flex items-center gap-1">
                                                                <Heart className="w-4 h-4 text-red-400" />
                                                                Salud
                                                            </span>
                                                            <span className="font-semibold text-white">{getCurrentHero().health}/{getMaxHealth()}</span>
                                                        </div>
                                                        <div className="w-full bg-purple-900/50 rounded-full h-3">
                                                            <div 
                                                                className={`h-3 rounded-full bg-gradient-to-r ${getHealthColor(getCurrentHero().health)} transition-all duration-300`}
                                                                style={{ width: `${(getCurrentHero().health / getMaxHealth()) * 100}%` }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </div>

                            {heroes.length > 1 && (
                                <div className="flex justify-center mt-8 space-x-3">
                                    {Array.from({ length: heroes.length }, (_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            disabled={isTransitioning}
                                            className={`cursor-pointer w-4 h-4 rounded-full transition-all duration-300 ${
                                                index === currentIndex 
                                                    ? 'bg-purple-600 scale-125 ring-2 ring-purple-300' 
                                                    : 'bg-purple-300 hover:bg-purple-400 hover:scale-110'
                                            } ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {selectedHero && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-purple-900/95 backdrop-blur-sm rounded-lg border border-purple-500/30 px-6 py-4 shadow-2xl">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-400">
                                    {selectedHero.spritesheet ? (
                                        <img
                                            src={selectedHero.spritesheet}
                                            alt={selectedHero.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-purple-600 flex items-center justify-center text-white">
                                            👤
                                        </div>
                                    )}
                                </div>
                                <div className="text-white">
                                    <div className="font-bold text-lg">{selectedHero.name}</div>
                                    <div className="text-sm text-purple-200">❤ {selectedHero.health}/{getMaxHealth()} HP</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleSelectHero(selectedHero)}
                                disabled={isLoading}
                                className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                            >
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Seleccionando...
                                    </div>
                                ) : (
                                    'Seleccionar Héroe'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {heroes.length === 0 && (
                    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                        <Crown className="w-24 h-24 text-purple-500 mb-6" />
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">
                            No hay héroes disponibles
                        </h2>
                        <p className="text-gray-600 max-w-md">
                            Parece que no tienes héroes para seleccionar. Contacta al administrador.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}