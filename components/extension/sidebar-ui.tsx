import React, { useState } from "react";
import { siteConfig } from "../../config/site-config";
import type { LinkBox, LinkItem } from "../../config/site-config";
import { ExternalLink } from "lucide-react";

// Minimal styles injected into Shadow DOM
const styles = `
  :host {
    all: initial;
    font-family: Inter, system-ui, sans-serif;
    position: fixed;
    z-index: 2147483647;
  }
  .sheriff-drawer {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 340px;
    background: rgba(10, 10, 10, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 24px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 85vh;
    overflow-y: auto;
    opacity: 0;
    transform: translateY(20px) scale(0.95);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 40px 80px -20px rgba(0,0,0,0.6);
  }
  .sheriff-drawer.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }
  /* Scrollbar */
  .sheriff-drawer::-webkit-scrollbar {
    width: 6px;
  }
  .sheriff-drawer::-webkit-scrollbar-track {
    background: transparent;
  }
  .sheriff-drawer::-webkit-scrollbar-thumb {
    background: rgba(255,255,255,0.15);
    border-radius: 3px;
  }
  
  .section-title {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255,255,255,0.4);
    font-weight: 600;
    margin-bottom: 10px;
  }
  
  /* Link Grid */
  .link-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }
  .link-item {
    background: rgba(255,255,255,0.03);
    border-radius: 10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    text-decoration: none;
    color: white;
    transition: all 0.2s;
    text-align: center;
    border: 1px solid transparent;
  }
  .link-item:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-1px);
    border-color: rgba(255,255,255,0.1);
  }
  .link-icon {
    opacity: 0.7;
    transition: opacity 0.2s;
  }
  .link-item:hover .link-icon {
    opacity: 1;
  }
  .link-text {
    font-size: 11px;
    color: rgba(255,255,255,0.6);
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
  }
  .link-item:hover .link-text {
    color: white;
  }

  /* Todo List */
  .todo-container {
    background: rgba(255,255,255,0.03);
    border-radius: 12px;
    padding: 12px;
    border: 1px solid rgba(255,255,255,0.05);
  }
  .todo-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 150px;
    overflow-y: auto;
    margin-bottom: 10px;
  }
  .todo-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    border-radius: 6px;
    transition: background 0.1s;
    cursor: pointer;
  }
  .todo-item:hover {
    background: rgba(255,255,255,0.05);
  }
  .todo-checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  .todo-item.completed .todo-checkbox {
    background: white;
    border-color: white;
  }
  .todo-text {
    font-size: 13px;
    color: rgba(255,255,255,0.8);
    flex: 1;
  }
  .todo-item.completed .todo-text {
    text-decoration: line-through;
    opacity: 0.5;
  }
  .todo-input {
    width: 100%;
    background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 6px;
    padding: 8px;
    color: white;
    font-size: 12px;
    outline: none;
    box-sizing: border-box; /* Important for shadow DOM */
  }
  .todo-input:focus {
    border-color: rgba(255,255,255,0.3);
  }
`;

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export function SidebarUI() {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [boxes, setBoxes] = useState<LinkBox[]>([]);

  // Double Shift Logic
  const lastShiftRef = React.useRef<number>(0);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Shift' && !e.repeat) {
        const now = Date.now();
        if (now - lastShiftRef.current < 400) { // 400ms threshold for double tap
          setOpen(prev => !prev);
          lastShiftRef.current = 0; // Reset
        } else {
          lastShiftRef.current = now;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Todo & Links Sync Logic (Chrome Storage vs LocalStorage)
  React.useEffect(() => {
    const STORAGE_KEY = "sheriff-custom-links";
    const TASKS_KEY = "sheriff-tasks";

    const loadData = () => {
      // @ts-expect-error - chrome is defined in extension context
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        // @ts-expect-error - chrome.storage.local is valid
        chrome.storage.local.get([TASKS_KEY, STORAGE_KEY], (result) => {
          if (result[TASKS_KEY]) setTasks(result[TASKS_KEY]);
          if (result[STORAGE_KEY]) {
            setBoxes(result[STORAGE_KEY]);
          } else {
            setBoxes(siteConfig.boxes);
          }
        });
      } else {
        const savedTasks = localStorage.getItem(TASKS_KEY);
        if (savedTasks) setTasks(JSON.parse(savedTasks));

        const savedLinks = localStorage.getItem(STORAGE_KEY);
        if (savedLinks) {
          try {
            setBoxes(JSON.parse(savedLinks));
          } catch {
            setBoxes(siteConfig.boxes);
          }
        } else {
          setBoxes(siteConfig.boxes);
        }
      }
    };

    loadData();

    // Listen for storage changes to sync in real-time if possible
    // Only works between extension contexts or with custom events
    // For now we load on mount, but we could add a listener
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    // @ts-expect-error - chrome is defined in extension context
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      // @ts-expect-error - chrome.storage.local is valid in extension
      chrome.storage.local.set({ 'sheriff-tasks': newTasks });
    } else {
      localStorage.setItem("sheriff-tasks", JSON.stringify(newTasks));
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    const newTask = { id: crypto.randomUUID(), text: inputValue.trim(), completed: false };
    saveTasks([...tasks, newTask]);
    setInputValue("");
  };

  const toggleTask = (id: string) => {
    saveTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <>
      <style>{styles}</style>

      <div className={`sheriff-drawer ${open ? 'open' : ''}`}>

        {/* Todo List Section */}
        <div>
          <div className="section-title">Focus Tasks</div>
          <div className="todo-container">
            <div className="todo-list">
              {tasks.length === 0 && (
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)', textAlign: 'center', padding: '10px' }}>
                  No tasks. Double shift to focus!
                </div>
              )}
              {tasks.map((task: Task) => (
                <div key={task.id} className={`todo-item ${task.completed ? 'completed' : ''}`} onClick={() => toggleTask(task.id)}>
                  <div className="todo-checkbox">
                    {task.completed && <div style={{ width: 8, height: 8, background: 'black', borderRadius: 2 }}></div>}
                  </div>
                  <span className="todo-text">{task.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={addTask}>
              <input
                className="todo-input"
                placeholder="Add a task..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
              />
            </form>
          </div>
        </div>

        {/* Link Boxes */}
        {boxes.map((box: LinkBox) => (
          <div key={box.id}>
            <div className="section-title">{box.title}</div>
            <div className="link-grid">
              {box.links.map((link: LinkItem, i: number) => {
                const Icon = link.icon || ExternalLink;
                return (
                  <a key={i} href={link.url} className="link-item">
                    <Icon size={16} className="link-icon" />
                    <span className="link-text">{link.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
