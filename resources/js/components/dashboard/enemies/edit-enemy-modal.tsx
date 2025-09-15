import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import Enemy, { EnemyType } from "@/types/enemy";
import Planet from "@/types/planet";
import { User, Heart, Zap, ImageIcon, Upload, Angry, Globe, Edit } from "lucide-react";

interface EditEnemyModalProps {
    isOpen: boolean;
    onClose: () => void;
    enemy: Enemy | null;
    types: EnemyType[];
    planets: Planet[];
}

export default function EditEnemyModal({ isOpen, onClose, enemy, types, planets }: EditEnemyModalProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        health: '',
        basic_attack: '',
        is_hostile: false as boolean,
        planet_id: '',
        enemy_type_id: '',
        spritesheet: null as File | null,
        _method: 'PUT' as string,
    });

    // Cargar datos del enemigo cuando se abre el modal
    useEffect(() => {
        if (enemy && isOpen) {
            setData({
                name: enemy.name || '',
                health: enemy.health?.toString() || '',
                basic_attack: enemy.basic_attack?.toString() || '',
                is_hostile: enemy.is_hostile || false,
                planet_id: enemy.planet_id || '',
                enemy_type_id: enemy.enemy_type_id || '',
                spritesheet: null,
                _method: 'PUT',
            });
            
            // Mostrar la imagen actual como preview
            if (enemy.spritesheet) {
                setImagePreview(enemy.spritesheet);
            }
        }
    }, [enemy, isOpen, setData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!enemy) return;

        post(route('enemies.update', enemy.id), {
            onSuccess: () => {
                onClose();
                reset();
                setImagePreview(null);
            },
            onError: () => {
                // Los errores se manejan automáticamente por Inertia
            }
        });
    };

    const handleClose = () => {
        onClose();
        reset();
        clearErrors();
        setImagePreview(null);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('spritesheet', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(enemy?.spritesheet || null);
        }
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
            setImagePreview(null);
        }
    }, [isOpen, reset, clearErrors]);

    if (!enemy) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Edit className="h-5 w-5 text-blue-600" />
                        Editar Enemigo
                    </DialogTitle>
                    <DialogDescription>
                        Modifica la información del enemigo "{enemy.name}".
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center space-y-4">
                        <Avatar className="size-24 border-4 border-gray-200">
                            <AvatarImage
                                src={imagePreview || ''}
                                alt="Preview"
                                className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white">
                                <User className="h-12 w-12" />
                            </AvatarFallback>
                        </Avatar>

                        <div className="w-full">
                            <Label htmlFor="spritesheet" className="flex items-center gap-2 text-sm font-medium">
                                <ImageIcon className="h-4 w-4 text-blue-600" />
                                Imagen del Enemigo
                            </Label>
                            <div className="mt-2 flex items-center gap-2">
                                <Input
                                    id="spritesheet"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`flex-1 ${errors.spritesheet ? 'border-red-500' : ''}`}
                                />
                                <Upload className="h-4 w-4 text-gray-400" />
                            </div>
                            {errors.spritesheet && (
                                <p className="text-sm text-red-600 mt-1">{errors.spritesheet}</p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                PNG, JPG o GIF • Máx. 2MB • Dejar vacío para mantener la imagen actual
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <User className="h-5 w-5 text-emerald-600" />
                            Información Básica
                        </h3>

                        <div className="space-y-2">
                            <Label htmlFor="name" className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Goblin Guerrero"
                                className={errors.name ? 'border-red-500' : ''}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-1">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="enemy_type_id" className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                Tipo de Enemigo
                            </Label>
                            <Select value={data.enemy_type_id} onValueChange={(value) => setData('enemy_type_id', value)}>
                                <SelectTrigger className={errors.enemy_type_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Selecciona un tipo" />
                                </SelectTrigger>
                                <SelectContent>
                                    {types.map((type) => (
                                        <SelectItem key={type.id} value={type.id}>
                                            {type.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.enemy_type_id && (
                                <p className="text-sm text-red-600 mt-1">{errors.enemy_type_id}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="planet_id" className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-purple-500" />
                                Planeta
                            </Label>
                            <Select value={data.planet_id} onValueChange={(value) => setData('planet_id', value)}>
                                <SelectTrigger className={errors.planet_id ? 'border-red-500' : ''}>
                                    <SelectValue placeholder="Selecciona un planeta" />
                                </SelectTrigger>
                                <SelectContent>
                                    {planets.map((planet) => (
                                        <SelectItem key={planet.id} value={planet.id}>
                                            {planet.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.planet_id && (
                                <p className="text-sm text-red-600 mt-1">{errors.planet_id}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                            <Zap className="h-5 w-5 text-orange-600" />
                            Estadísticas
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="health" className="flex items-center gap-2">
                                    <Heart className="h-4 w-4 text-red-500" />
                                    Vida
                                </Label>
                                <Input
                                    id="health"
                                    type="number"
                                    min="1"
                                    value={data.health}
                                    onChange={(e) => setData('health', e.target.value)}
                                    placeholder="100"
                                    className={errors.health ? 'border-red-500' : ''}
                                />
                                {errors.health && (
                                    <p className="text-sm text-red-600 mt-1">{errors.health}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="basic_attack" className="flex items-center gap-2">
                                    <Zap className="h-4 w-4 text-orange-500" />
                                    Ataque
                                </Label>
                                <Input
                                    id="basic_attack"
                                    type="number"
                                    min="1"
                                    value={data.basic_attack}
                                    onChange={(e) => setData('basic_attack', e.target.value)}
                                    placeholder="25"
                                    className={errors.basic_attack ? 'border-red-500' : ''}
                                />
                                {errors.basic_attack && (
                                    <p className="text-sm text-red-600 mt-1">{errors.basic_attack}</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 py-3 px-1 bg-gray-50 rounded-lg">
                            <Angry className="h-5 w-5 text-red-500" />
                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="is_hostile"
                                    checked={data.is_hostile}
                                    onCheckedChange={(checked) => setData('is_hostile', checked)}
                                />
                                <Label htmlFor="is_hostile" className="text-sm font-medium">
                                    ¿Es hostil?
                                </Label>
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={processing}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                        >
                            {processing ? "Guardando..." : "Guardar Cambios"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}