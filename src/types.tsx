export interface Board {
  name: string;
  columns: BoardColumns[];
}

export interface BoardColumns {
  name: string;
  tasks: BoardTasks[];
}

export interface BoardTasks {
  title: string;
  description: string;
  status: string;
  subtasks: BoardSubTasks[];
}

export interface BoardSubTasks {
  isCompleted: boolean;
  title: string;
}

// boards: Array(3)
//.. 0: columns: Array(3)
//.... 0: {name: 'Todo', tasks: Array(4)}
//.... tasks: Array(4)
//.... .... 0: {title: 'Build UI for onboarding flow', description: '', status: 'Todo', subtasks: Array(3)}
//.... .... description: ""
//.... .... status: "Todo"
//.... .... title: "Build UI for onboarding flow"
//.... .... subtasks: Array(3)
//.... .... .... 0:
//.... .... .... isCompleted: true
//.... .... .... title: "Sign up page"
//.... .... .... [[Prototype]]: Object
//.... .... .... 1: {title: 'Sign in page', isCompleted: false}
//.... .... .... 2: {title: 'Welcome page', isCompleted: false}
//.... .... 1: {title: 'Build UI for search', description: '', status: 'Todo', subtasks: Array(1)}
//.... .... 2: {title: 'Build settings UI', description: '', status: 'Todo', subtasks: Array(2)}
//.... .... 3: {title: 'QA and test all major user journeys', description: 'Once we feel version one is ready, we need to rigo…rnally and externally to identify any major gaps.', status: 'Todo', subtasks: Array(2)}
//.... 1: {name: 'Doing', tasks: Array(6)}
//.... 2: {name: 'Done', tasks: Array(7)}
// 1: {name: 'Marketing Plan', columns: Array(3)}
// 2: {name: 'Roadmap', columns: Array(3)}

//  useState<{
//     name: string;
//     columns: {
//         name: string;
//         tasks: {
//             title: string;
//             description: string;
//             status: string;
//             subtasks: {
//                 title: string;
//                 isCompleted: boolean;
//             }[];
//         }[];
//     }[];
//   }
