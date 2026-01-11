import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

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

        // Calculate the day number relative to planning start (1-indexed)
        const daysSinceStart = Math.floor(
            (currentCalendarDate.getTime() - planningStartDate.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

        // Only show tasks if we're in the same month or later as planning start
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

        // Empty cells before first day
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
        }

        // Days of month
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

export default PlanningCalendar;