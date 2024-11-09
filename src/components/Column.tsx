import { useDroppable } from "@dnd-kit/core";
import { ColumnType as ColumnType, Task } from "../lib/types";
import TaskCard from "./TaskCard";

type ColumnProps = {
	column: ColumnType;
	tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
	const { setNodeRef } = useDroppable({
		id: column.id,
	});

	return (
		<div className="flex w-80 flex-col rounded-lg bg-neutral-800 p-4">
			<h2 className="mb-4 font-semibold text-neutral-400">{column.title}</h2>
			<div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
				{tasks.map((task) => {
					return <TaskCard key={task.id} task={task} />;
				})}
			</div>
		</div>
	);
}
