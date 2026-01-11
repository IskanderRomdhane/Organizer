import React, { useState } from 'react';
import { Plus, Trash2, Play, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface Task {
    name: string;
    duration: number;
}

interface TaskSidebarProps {
    tasks: Task[];
    onAddTask: (task: Task) => void;
    onRemoveTask: (index: number) => void;
    onGeneratePlanning: () => void;
    loading: boolean;
    error: string | null;
    planningGenerated: boolean;
    getTaskColor: (index: number) => string;
}

const TaskSidebar: React.FC<TaskSidebarProps> = ({
                                                     tasks,
                                                     onAddTask,
                                                     onRemoveTask,
                                                     onGeneratePlanning,
                                                     loading,
                                                     error,
                                                     planningGenerated,
                                                     getTaskColor
                                                 }) => {
    const [newTask, setNewTask] = useState<{ name: string; duration: string }>({
        name: "",
        duration: ""
    });

    const handleAddTask = (): void => {
        if (newTask.name.trim() && parseInt(newTask.duration) > 0) {
            onAddTask({
                name: newTask.name.trim(),
                duration: parseInt(newTask.duration)
            });
            setNewTask({ name: "", duration: "" });
        }
    };

    return (
        <div className="space-y-6">
            {/* Add Task Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-purple-600" />
                    Ajouter une tâche
                </h3>
                <div className="space-y-3">
                    <input
                        type="text"
                        placeholder="Nom de la tâche"
                        value={newTask.name}
                        onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                    <input
                        type="number"
                        placeholder="Durée (jours)"
                        min="1"
                        value={newTask.duration}
                        onChange={(e) => setNewTask({ ...newTask, duration: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                    />
                    <button
                        onClick={handleAddTask}
                        disabled={!newTask.name.trim() || !newTask.duration}
                        className="w-full py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition-colors"
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            {/* Task List */}
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Tâches ({tasks.length})</h3>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-purple-300 transition-colors"
                        >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getTaskColor(index)}`}></div>
                                <div className="min-w-0 flex-1">
                                    <div className="text-sm font-medium text-gray-800 truncate">{task.name}</div>
                                    <div className="text-xs text-gray-500">{task.duration}j</div>
                                </div>
                            </div>
                            <button
                                onClick={() => onRemoveTask(index)}
                                className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors flex-shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Generate Button */}
            <button
                onClick={onGeneratePlanning}
                disabled={tasks.length === 0 || loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-lg font-semibold transition-all shadow-md flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <Loader className="w-5 h-5 animate-spin" />
                        Génération...
                    </>
                ) : (
                    <>
                        <Play className="w-5 h-5" />
                        Générer le Planning
                    </>
                )}
            </button>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                            <div className="text-sm font-medium text-red-800">Erreur</div>
                            <div className="text-xs text-red-600 mt-1">{error}</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Success Message */}
            {planningGenerated && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium text-green-800">Planning généré!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskSidebar;