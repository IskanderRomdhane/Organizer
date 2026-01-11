from ortools.sat.python import cp_model


def solve_planning(tasks):
    model = cp_model.CpModel()

    starts = {}
    ends = {}

    #Create variables for each task
    for task in tasks:
        name = task["name"]
        duration = task["duration"]

        starts[name] = model.NewIntVar(1, 100, f"start_{name}")
        ends[name] = model.NewIntVar(1, 100, f"end_{name}")

        model.Add(ends[name] == starts[name] + duration - 1)

    #Force tasks to run one after another
    task_order = list(starts.keys())

    for i in range(len(task_order) - 1):
        current_task = task_order[i]
        next_task = task_order[i + 1]
        #Added +1 so tasks doesn't start in the day where the other finishes
        model.Add(starts[next_task] >= ends[current_task] + 1)

    solver = cp_model.CpSolver()
    solver.Solve(model)

    #Format result
    result = []
    for name in task_order:
        result.append({
            "task": name,
            "start": solver.Value(starts[name]),
            "end": solver.Value(ends[name])
        })

    return result
