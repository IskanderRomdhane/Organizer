import React, {type JSX, useState} from 'react';
import { Calendar, Plus, Trash2, Play, AlertCircle, CheckCircle, Loader, ChevronLeft, ChevronRight } from 'lucide-react';

interface Task {
  name: string;
  duration: number;
}

interface ScheduleItem {
  task: string;
  start: number;
  end: number;
  duration: number;
}

interface PlanningResponse {
  schedule?: ScheduleItem[];
  explanation?: string;
  startDate?: string;
}

// TaskSidebar Component
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

// PlanningCalendar Component
interface PlanningCalendarProps {
  tasks: Task[];
  schedule: ScheduleItem[] | undefined;
  startDate: string | undefined;
  currentMonth: Date;
  onMonthChange: (date: Date) => void;
  getTaskColor: (index: number) => string;
}

const PlanningCalendar: React.FC<PlanningCalendarProps> = ({
                                                             tasks,
                                                             schedule,
                                                             startDate,
                                                             currentMonth,
                                                             onMonthChange,
                                                             getTaskColor
                                                           }) => {
  const getDaysInMonth = (date: Date): { daysInMonth: number; startingDayOfWeek: number } => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const getTasksForDay = (calendarDay: number): ScheduleItem[] => {
    if (!schedule || !startDate) return [];

    const planningStartDate = new Date(startDate);
    const currentCalendarDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        calendarDay
    );

    const daysSinceStart = Math.floor(
        (currentCalendarDate.getTime() - planningStartDate.getTime()) / (1000 * 60 * 60 * 24)
    ) + 1;

    if (currentCalendarDate < planningStartDate) return [];

    return schedule.filter(item =>
        daysSinceStart >= item.start && daysSinceStart <= item.end
    );
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const monthName = currentMonth.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
    const days: JSX.Element[] = [];
    const weekDays = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const tasksForDay = getTasksForDay(day);
      const planningStartDate = startDate ? new Date(startDate) : null;
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isPlanningDay = planningStartDate && currentDate >= planningStartDate;

      days.push(
          <div key={day} className={`aspect-square border border-gray-200 p-2 bg-white hover:bg-gray-50 transition-colors ${isPlanningDay && tasksForDay.length === 0 ? 'bg-gray-50' : ''}`}>
            <div className="text-sm font-medium text-gray-700 mb-1">{day}</div>
            <div className="space-y-1">
              {tasksForDay.map((item, idx) => {
                const taskIndex = tasks.findIndex(t => t.name === item.task);
                const daysSinceStart = planningStartDate
                    ? Math.floor((currentDate.getTime() - planningStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
                    : day;
                const isStart = daysSinceStart === item.start;

                return (
                    <div
                        key={idx}
                        className={`text-xs px-1.5 py-0.5 rounded text-white truncate ${getTaskColor(taskIndex)}`}
                        title={item.task}
                    >
                      {isStart && `● ${item.task}`}
                    </div>
                );
              })}
            </div>
          </div>
      );
    }

    return (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800 capitalize">{monthName}</h2>
            <div className="flex gap-2">
              <button
                  onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                  onClick={() => onMonthChange(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
            {weekDays.map(day => (
                <div key={day} className="bg-gray-50 text-center py-3 font-semibold text-gray-600 text-sm border-b border-gray-200">
                  {day}
                </div>
            ))}
            {days}
          </div>
        </div>
    );
  };

  return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {renderCalendar()}
      </div>
  );
};

// AIExplanation Component
interface AIExplanationProps {
  explanation: string | undefined;
}

const AIExplanation: React.FC<AIExplanationProps> = ({ explanation }) => {
  if (!explanation) return null;

  return (
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="text-sm font-semibold text-purple-900 mb-2 flex items-center gap-2">
          🤖 Analyse IA
        </div>
        <p className="text-sm text-purple-800 leading-relaxed whitespace-pre-wrap">
          {explanation}
        </p>
      </div>
  );
};

// Main Component
const PulsiiaPlanner: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { name: "frontend", duration: 2 },
    { name: "backend", duration: 1 },
    { name: "ai", duration: 3 }
  ]);
  const [planning, setPlanning] = useState<PlanningResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 0, 1));

  const getTaskColor = (index: number): string => {
    const colors = [
      'bg-blue-400',
      'bg-purple-400',
      'bg-green-400',
      'bg-orange-400',
      'bg-pink-400',
      'bg-indigo-400',
      'bg-teal-400',
      'bg-red-400'
    ];
    return colors[index % colors.length];
  };

  const handleAddTask = (task: Task): void => {
    setTasks([...tasks, task]);
    setPlanning(null);
  };

  const handleRemoveTask = (index: number): void => {
    setTasks(tasks.filter((_, i) => i !== index));
    setPlanning(null);
  };

  const generatePlanning = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    const API_URL = import.meta.env.VITE_API_URL
    try {
      const response = await fetch(`${API_URL}/ajouterplan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tasks)
      });

      if (!response.ok) {
        throw new Error(`Erreur ${response.status}: ${response.statusText}`);
      }

      const data: PlanningResponse = await response.json();

      if (!data.startDate) {
        data.startDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).toISOString();
      }

      setPlanning(data);

      if (data.startDate) {
        const startDate = new Date(data.startDate);
        setCurrentMonth(new Date(startDate.getFullYear(), startDate.getMonth(), 1));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de se connecter au serveur backend");
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-6 px-6 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8" />
              <div>
                <h1 className="text-3xl font-bold">Pulsiia</h1>
                <p className="text-purple-100 text-sm">Moteur de Planning Intelligent</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            <div className="lg:col-span-1">
              <TaskSidebar
                  tasks={tasks}
                  onAddTask={handleAddTask}
                  onRemoveTask={handleRemoveTask}
                  onGeneratePlanning={generatePlanning}
                  loading={loading}
                  error={error}
                  planningGenerated={planning !== null}
                  getTaskColor={getTaskColor}
              />
            </div>

            <div className="lg:col-span-3">
              <PlanningCalendar
                  tasks={tasks}
                  schedule={planning?.schedule}
                  startDate={planning?.startDate}
                  currentMonth={currentMonth}
                  onMonthChange={setCurrentMonth}
                  getTaskColor={getTaskColor}
              />

              <AIExplanation explanation={planning?.explanation} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default PulsiiaPlanner;