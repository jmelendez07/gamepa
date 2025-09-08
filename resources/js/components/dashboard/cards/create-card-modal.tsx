import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, AlertCircle, Sparkles, Sword, Shield, Heart, Zap } from 'lucide-react';
import { TypeCard } from '@/types/card';

interface CreateCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: { name: string; energy_cost: string; stats: string; type_id: string };
    onInputChange: (field: 'name' | 'energy_cost' | 'stats' | 'type_id', value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    errors: {
        name?: string;
        energy_cost?: string;
        stats?: string;
        type_id?: string;
    };
    types: TypeCard[];
}

export default function CreateCardModal({ 
    isOpen, 
    onClose, 
    formData, 
    onInputChange,
    onSubmit, 
    processing,
    errors,
    types
}: CreateCardModalProps) {
    
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

    const selectedType = types.find(type => type.id === formData.type_id);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="h-5 w-5" />
                            <span>Crear Nueva Carta</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={onSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="name">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-emerald-600" />
                                Nombre de la Carta
                            </div>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => onInputChange('name', e.target.value)}
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
                        <Label htmlFor="energy_cost">
                            <div className="flex items-center gap-2">
                                <Zap className="w-4 h-4 text-yellow-600" />
                                Costo de Energía
                            </div>
                        </Label>
                        <Input
                            id="energy_cost"
                            type="number"
                            min="0"
                            max="20"
                            value={formData.energy_cost}
                            onChange={(e) => onInputChange('energy_cost', e.target.value)}
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
                        <Label htmlFor="stats">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-purple-600" />
                                Estadísticas
                            </div>
                        </Label>
                        <Input
                            id="stats"
                            type="number"
                            min="1"
                            max="999"
                            value={formData.stats}
                            onChange={(e) => onInputChange('stats', e.target.value)}
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
                        <Label htmlFor="type">
                            <div className="flex items-center gap-2">
                                <Sword className="w-4 h-4 text-gray-600" />
                                Tipo de Carta
                            </div>
                        </Label>
                        <Select value={formData.type_id} onValueChange={(value) => onInputChange('type_id', value)}>
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

                    {formData.name && formData.energy_cost && formData.stats && formData.type_id && selectedType && (
                        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                            <h4 className="font-medium text-emerald-800 mb-3">Vista previa de la carta:</h4>
                            
                            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden max-w-[200px] mx-auto">
                                <div className={`bg-gradient-to-r ${getTypeGradient(selectedType.name)} p-2 relative`}>
                                    <div className="flex items-center justify-between text-white text-sm">
                                        <span className="font-bold truncate">{formData.name}</span>
                                        <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                            <Zap className="w-3 h-3" />
                                            <span className="font-bold text-xs">{formData.energy_cost}</span>
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
                                        <div className="font-bold text-lg">{formData.stats}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <DialogFooter className="flex space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                        >
                            {processing ? 'Creando...' : 'Crear Carta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}