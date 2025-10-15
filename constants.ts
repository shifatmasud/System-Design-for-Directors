import {
    Code,
    ChatTeardropText,
    GitBranch,
    TreeStructure,
    FlowArrow,
    ListNumbers
} from 'phosphor-react';
import { Concept } from './types';

export const CONCEPTS: Concept[] = [
    { id: 'pseudo-code', title: 'Pseudo Code', what: 'The Blueprint', why: 'Clarity', how: 'Plain Language', code: `// STATE\nINITIALIZE 'count' to 0\n\n// LOGIC\nWHEN "Increment" is clicked:\n  ADD 1 to 'count'\n  UPDATE display`, icon: Code, lang: 'javascript' },
    { id: 'sys-prompt', title: 'System Prompt', what: 'The Briefing', why: 'Precision', how: 'Define Rules', code: `// You are an expert React developer.
// Generate a single, self-contained component
// using functional components and the useState hook.`, icon: ChatTeardropText, lang: 'javascript' },
    { id: 'context-map', title: 'Context Map', what: 'The Ecosystem', why: 'Scope', how: 'Map Boundaries', code: `  [User]
    |
    v Clicks
  [App UI]
    |
    v Reads/Writes
  [State]`, icon: GitBranch, lang: 'javascript' },
    { id: 'component-tree', title: 'Component Tree', what: 'UI Hierarchy', why: 'Structure', how: 'Nest Components', code: `App\n └─ Counter\n     ├─ Display (shows count)\n     └─ Button (handles clicks)`, icon: TreeStructure, lang: 'javascript' },
    { id: 'logic-tree', title: 'Logic Tree', what: 'Decision Flow', why: 'Edge Cases', how: 'Map Paths', code: `         Click Event
               |
    Is button "Increment"?
          /        \\
        (Yes)      (No)
          |        |
      count++    count--`, icon: FlowArrow, lang: 'javascript' },
    { id: 'action-sequence', title: 'Action Sequence', what: 'The Dominoes', why: 'Debugging', how: 'List Steps', code: `1. User clicks button\n2. Event handler called\n3. setCount() executed\n4. React re-renders\n5. User sees new count`, icon: ListNumbers, lang: 'javascript' }
];