import { DndContext, DragEndEvent } from "@dnd-kit/core";
import Column from "./components/Column";
import { ColumnType, Task } from "./lib/types";
import { useState } from "react";

const COLUMNS: ColumnType[] = [
	{ id: "TODO", title: "To Do" },
	{ id: "IN_PROGRESS", title: "In Progress" },
	{ id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
	{
		id: "1",
		title: "Research Project",
		description: "Gather requirements and create initial documentation",
		status: "TODO",
	},
	{
		id: "2",
		title: "Design System",
		description: "Create component library and design tokens",
		status: "TODO",
	},
	{
		id: "3",
		title: "API Integration",
		description: "Implement REST API endpoints",
		status: "IN_PROGRESS",
	},
	{
		id: "4",
		title: "Testing",
		description: "Write unit tests for core functionality",
		status: "DONE",
	},
];

function App() {
	const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;

		if (!over) return;

		const taskId = active.id as string;
		const newStatus = over.id as Task["status"];

		setTasks(() =>
			tasks.map((task) =>
				task.id === taskId
					? {
							...task,
							status: newStatus,
					  }
					: task,
			),
		);
	};

	return (
		<main className="flex justify-center items-start pt-20 bg-neutral-900 h-screen">
			<div className="flex gap-8">
				<DndContext onDragEnd={handleDragEnd}>
					{COLUMNS.map((column) => {
						return (
							<Column
								key={column.id}
								column={column}
								tasks={tasks.filter((task) => task.status === column.id)}
							/>
						);
					})}
				</DndContext>
			</div>
		</main>
	);
}

export default App;
