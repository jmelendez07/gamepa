import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, AlertCircle, Sparkles, Sword, Shield, Heart, Zap } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Card from '@/types/card';
import { TypeCard } from '@/types/card';
import { toast } from "sonner";

interface EditCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Card | null;
    types: TypeCard[];
}

export default function EditCardModal({ 
    isOpen, 
    onClose, 
    card,
    types
}: EditCardModalProps) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        energy_cost: '',
        stats: '',
        type_id: ''
    });

    useEffect(() => {
        if (card && isOpen) {
            setData({
                name: card.name,
                energy_cost: card.energy_cost.toString(),
                stats: card.stats.toString(),
                type_id: card.type.id
            });
        }
    }, [card, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!card) return;

        put(route('cards.update', card.id), {
            onSuccess: () => {
                onClose();
                reset();
                clearErrors();
            },
            onError: () => {
                toast.error('Error al actualizar la carta');
            }
        });
    };

    const handleCancel = () => {
        onClose();
        reset();
        clearErrors();
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
        
        if (errors[field]) {
            clearErrors(field);
        }
    };

    const getTypeIcon = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return <Sword className="w-4 h-4 text-red-600" />;
            case 'defensa':
                return <Shield className="w-4 h-4 text-blue-600" />;
            case 'curación':
                return <Heart className="w-4 h-4 text-green-600" />;
            case 'potenciación':
                return <Zap className="w-4 h-4 text-yellow-600" />;
            default:
                return <Sparkles className="w-4 h-4 text-gray-600" />;
        }
    };

    const getTypeGradient = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return 'from-red-400 to-red-600';
            case 'defensa':
                return 'from-blue-400 to-blue-600';
            case 'curación':
                return 'from-green-400 to-green-600';
            case 'potenciación':
                return 'from-yellow-400 to-yellow-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    if (!card) return null;

    const selectedType = types.find(type => type.id === data.type_id);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="h-5 w-5" />
                            <span>Editar Carta</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                Nombre de la Carta
                            </div>
                        </Label>
                        <Input
                            id="edit-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Ejemplo: Dragón de Fuego, Escudo Místico..."
                            className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.name && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.name}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-energy-cost">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-600" />
                                Costo de Energía
                            </div>
                        </Label>
                        <Input
                            id="edit-energy-cost"
                            type="number"
                            min="0"
                            max="20"
                            value={data.energy_cost}
                            onChange={(e) => handleInputChange('energy_cost', e.target.value)}
                            placeholder="0"
                            className={errors.energy_cost ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.energy_cost && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.energy_cost}</span>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            Cantidad de energía requerida para usar esta carta (0-20).
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="edit-stats">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                Estadísticas
                            </div>
                        </Label>
                        <Input
                            id="edit-stats"
                            type="number"
                            min="1"
                            max="999"
                            value={data.stats}
                            onChange={(e) => handleInputChange('stats', e.target.value)}
                            placeholder="0"
                            className={errors.stats ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.stats && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.stats}</span>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            Poder de la carta (daño, defensa, curación, etc.).
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="edit-type">
                            <div className="flex items-center gap-2">
                                <Sword className="w-4 h-4 text-gray-600" />
                                Tipo de Carta
                            </div>
                        </Label>
                        <Select value={data.type_id} onValueChange={(value) => handleInputChange('type_id', value)}>
                            <SelectTrigger className={errors.type_id ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Selecciona un tipo de carta" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                        <div className="flex items-center gap-2">
                                            {getTypeIcon(type.name)}
                                            <span className="font-medium">{type.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type_id && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.type_id}</span>
                            </div>
                        )}
                    </div>

                    {data.name && data.energy_cost && data.stats && data.type_id && selectedType && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h4 className="font-medium text-emerald-800 mb-3">Vista previa de la carta actualizada:</h4>
                            
                            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden max-w-[200px] mx-auto">
                                <div className={`bg-gradient-to-r ${getTypeGradient(selectedType.name)} p-2 relative`}>
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span className="font-bold truncate">{data.name}</span>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            <span className="font-bold text-xs">{data.energy_cost}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-3 space-y-2">
                                    <div className="flex items-center gap-1">
                                        {getTypeIcon(selectedType.name)}
                                        <span className="text-xs font-medium">{selectedType.name}</span>
                                    </div>
                                    
                                    <div className="bg-gray-50 rounded-lg p-2 text-center">
                                        <div className="text-xs text-gray-500">Stats</div>
                                        <div className="font-bold text-lg">{data.stats}</div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-3 text-xs text-gray-600">
                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <span className="font-medium">Original:</span>
                                        <div>{card.name} | ⚡{card.energy_cost} | 📊{card.stats}</div>
                                    </div>
                                    <div>
                                        <span className="font-medium">Nuevo:</span>
                                        <div>{data.name} | ⚡{data.energy_cost} | 📊{data.stats}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleCancel}
                            disabled={processing}
                            className='cursor-pointer'
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer disabled:cursor-not-allowed bg-emerald-600 hover:bg-emerald-700"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Carta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}