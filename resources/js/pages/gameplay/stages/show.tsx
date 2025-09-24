import { Stage } from "@/types/planet";

interface IStagesShowProps {
    stage: Stage;
}

export default function StagesShow({ stage }: IStagesShowProps) {
    return (
        <div>
            <h1>{stage.name}</h1>
        </div>
    );
}