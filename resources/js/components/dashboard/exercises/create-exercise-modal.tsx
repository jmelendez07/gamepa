import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, AlertCircle, Calculator, Globe, Target, Dumbbell } from 'lucide-react';
import Planet from '@/types/planet';
import { Difficulty } from '@/types/exercise';
import { Difficulties } from '@/enums/difficulties';

interface CreateExerciseModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: { operation: string; planet_id: string; difficulty_id: string };
    onInputChange: (field: 'operation' | 'planet_id' | 'difficulty_id', value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    errors: {
        operation?: string;
        planet_id?: string;
        difficulty_id?: string;
    };
    planets: Planet[];
    difficulties: Difficulty[];
}

export default function CreateExerciseModal({ 
    isOpen, 
    onClose, 
    formData, 
    onInputChange,
    onSubmit, 
    processing,
    errors,
    planets,
    difficulties
}: CreateExerciseModalProps) {
    
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case Difficulties.Easy.toLowerCase():
                return 'text-green-600';
            case Difficulties.Medium.toLowerCase():
                return 'text-yellow-600';
            case Difficulties.Hard.toLowerCase():
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Dumbbell className="h-5 w-5" />
                            <span>Crear Nuevo Ejercicio</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={onSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="operation">
                            <div className="flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-purple-600" />
                                Operación Matemática
                            </div>
                        </Label>
                        <Textarea
                            id="operation"
                            value={formData.operation}
                            onChange={(e) => onInputChange('operation', e.target.value)}
                            placeholder="Ejemplo: 5 + 3 = ?, 12 ÷ 4 = ?, 7 × 8 = ?"
                            rows={3}
                            className={errors.operation ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.operation && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.operation}</span>
                            </div>
                        )}
                        <p className="text-xs text-gray-500">
                            Escribe la operación matemática que los estudiantes deberán resolver.
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="planet">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-600" />
                                Planeta
                            </div>
                        </Label>
                        <Select value={formData.planet_id} onValueChange={(value) => onInputChange('planet_id', value)}>
                            <SelectTrigger className={errors.planet_id ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Selecciona un planeta" />
                            </SelectTrigger>
                            <SelectContent>
                                {planets.map((planet) => (
                                    <SelectItem key={planet.id} value={planet.id}>
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-4 h-4 text-blue-500" />
                                            <div className="grid grid-cols-[auto_1fr] items-center gap-1 overflow-hidden">
                                                <div className="font-medium text-sm">{planet.name}</div>
                                                {planet.description && (
                                                    <div className="text-xs text-gray-500 mt-0.5 truncate">
                                                        {planet.description}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.planet_id && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.planet_id}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="difficulty">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-orange-600" />
                                Dificultad
                            </div>
                        </Label>
                        <Select value={formData.difficulty_id} onValueChange={(value) => onInputChange('difficulty_id', value)}>
                            <SelectTrigger className={errors.difficulty_id ? 'border-red-500' : ''}>
                                <SelectValue placeholder="Selecciona una dificultad" />
                            </SelectTrigger>
                            <SelectContent>
                                {difficulties.map((difficulty) => (
                                    <SelectItem key={difficulty.id} value={difficulty.id}>
                                        <div className="flex items-center gap-2">
                                            <Target className={`w-4 h-4 ${getDifficultyColor(difficulty.name)}`} />
                                            <span className="font-medium">{difficulty.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.difficulty_id && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.difficulty_id}</span>
                            </div>
                        )}
                    </div>

                    {formData.operation && formData.planet_id && formData.difficulty_id && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-medium text-purple-800 mb-2">Vista previa del ejercicio:</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-purple-600" />
                                    <span className="font-mono bg-white px-2 py-1 rounded border">
                                        {formData.operation}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-blue-600" />
                                    <span>{planets.find(p => p.id === formData.planet_id)?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-orange-600" />
                                    <span className={getDifficultyColor(difficulties.find(d => d.id === formData.difficulty_id)?.name || '')}>
                                        {difficulties.find(d => d.id === formData.difficulty_id)?.name}
                                    </span>
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
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                        >
                            {processing ? 'Creando...' : 'Crear Ejercicio'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}