import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, AlertCircle, Calculator, Globe, Target } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Exercise from '@/types/exercise';
import Planet from '@/types/planet';
import { Difficulty } from '@/types/exercise';
import { toast } from "sonner";
import { Difficulties } from '@/enums/difficulties';

interface EditExerciseModalProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: Exercise | null;
    planets: Planet[];
    difficulties: Difficulty[];
}

export default function EditExerciseModal({ 
    isOpen, 
    onClose, 
    exercise,
    planets,
    difficulties
}: EditExerciseModalProps) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        operation: '',
        planet_id: '',
        difficulty_id: ''
    });

    useEffect(() => {
        if (exercise && isOpen) {
            setData({
                operation: exercise.operation,
                planet_id: exercise.planet.id,
                difficulty_id: exercise.difficulty.id
            });
        }
    }, [exercise, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!exercise) return;

        put(route('exercises.update', exercise.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                clearErrors();
            },
            onError: () => {
                toast.error('Error al actualizar el ejercicio');
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

    if (!exercise) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Calculator className="h-5 w-5" />
                            <span>Editar Ejercicio</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="edit-operation">
                            <div className="flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-purple-600" />
                                Operación Matemática
                            </div>
                        </Label>
                        <Textarea
                            id="edit-operation"
                            value={data.operation}
                            onChange={(e) => handleInputChange('operation', e.target.value)}
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
                            Modifica la operación matemática que los estudiantes deberán resolver.
                        </p>
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="edit-planet">
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-600" />
                                Planeta
                            </div>
                        </Label>
                        <Select value={data.planet_id} onValueChange={(value) => handleInputChange('planet_id', value)}>
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
                        <Label htmlFor="edit-difficulty">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-orange-600" />
                                Dificultad
                            </div>
                        </Label>
                        <Select value={data.difficulty_id} onValueChange={(value) => handleInputChange('difficulty_id', value)}>
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

                    {data.operation && data.planet_id && data.difficulty_id && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-medium text-purple-800 mb-2">Vista previa del ejercicio:</h4>
                            <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-2">
                                    <Calculator className="w-4 h-4 text-purple-600" />
                                    <span className="font-mono bg-white px-2 py-1 rounded border">
                                        {data.operation}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-blue-600" />
                                    <span>{planets.find(p => p.id === data.planet_id)?.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Target className="w-4 h-4 text-orange-600" />
                                    <span className={getDifficultyColor(difficulties.find(d => d.id === data.difficulty_id)?.name || '')}>
                                        {difficulties.find(d => d.id === data.difficulty_id)?.name}
                                    </span>
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
                            className="cursor-pointer"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Ejercicio'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}