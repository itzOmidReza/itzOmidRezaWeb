/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  role: string;
  category: "frontend" | "backend" | "ai" | "fullstack" | "experiment";
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  challenges: string[];
  solution: string;
  previewCode?: string;
  featured?: boolean;
}

export interface SkillCategory {
  title: string;
  skills: { name: string; level: number; info: string }[];
}

export interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface TimelineEvent {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tag?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "clone";
  text: string;
  timestamp: string;
}
