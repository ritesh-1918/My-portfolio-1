import { motion } from 'framer-motion';
import { useGlassMorphism } from '../context/GlassMorphismProvider';
import { useState } from 'react';

interface Skill {
  name: string;
  level: number;
  icon: JSX.Element;
  color: string;
}

interface SkillCategory {
  title: string;
  icon: JSX.Element;
  skills: Record<string, Skill[]>;
}

const Skills = () => {
  const { applyGlass } = useGlassMorphism();
  const [activeSection, setActiveSection] = useState('Technical');
  const [activeCategory, setActiveCategory] = useState('Software Skills');

  const skillCategories: SkillCategory[] = [
    {
      title: 'Technical',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
      skills: {
        'Software Skills': [
          { name: 'Python', level: 85, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.26-.02.2-.01h4.22l.15-.02.14-.07.13-.06.09-.08.08-.08.05-.09.03-.1.01-.08V5.71l.06-.64.15-.58.24-.49.32-.38.4-.28.46-.2.5-.13.52-.07.48-.04.44-.02.4-.01z"/><path d="M9.75 23.82l-.9-.2-.73-.26-.59-.3-.45-.32-.34-.34-.25-.34-.16-.33-.1-.3-.04-.26-.02-.2.01-.13V15.5l.05-.63.13-.55.21-.46.26-.38.3-.31.33-.25.35-.19.35-.14.33-.1.3-.07.26-.04.21-.02h5.98l.69-.05.59-.14.5-.22.41-.27.33-.32.27-.35.2-.36.15-.37.1-.35.07-.32.04-.27.02-.21v-3.06h3.94l.21.03.28.07.32.12.35.18.36.26.36.36.35.46.32.59.28.73.21.88.14 1.05.05 1.23-.06 1.22-.16 1.04-.24.87-.32.71-.36.57-.4.44-.42.33-.42.24-.4.16-.36.1-.32.05-.26.02-.2.01h-4.22l-.15.02-.14.07-.13.06-.09.08-.08.08-.05.09-.03.1-.01.08v2.92l-.06.64-.15.58-.24.49-.32.38-.4.28-.46.2-.5.13-.52.07-.48.04-.44.02-.4.01z"/></svg>, color: '#3776AB' },
          { name: 'React', level: 80, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 10.11c1.03 0 1.87.84 1.87 1.89s-.84 1.85-1.87 1.85-1.87-.82-1.87-1.85.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9s-1.17 0-1.71.03c-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03s1.17 0 1.71-.03c.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.37 1.95-1.47-.84-1.63-3.05-1.01-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1.01-5.63 1.46-.84 3.45.12 5.37 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26S20.07 10.37 17.97 9.74c-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26s1.18 1.63 3.28 2.26c.25-.76.55-1.51.89-2.26z"/></svg>, color: '#61DAFB' },
          { name: 'Node.js', level: 78, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46.85 0 1.31-.52 1.31-1.42V9.47c0-.13-.11-.24-.24-.24H7.52c-.13 0-.24.11-.24.24v8.04c0 .43-.45.83-1.18.83-.31 0-.57-.07-.76-.15l-1.9-1.09c-.17-.1-.28-.29-.28-.49V8.41c0-.2.11-.39.28-.49l7.44-4.3c.17-.1.39-.1.56 0l7.44 4.3c.17.1.28.29.28.49v8.2c0 .2-.11.39-.28.49l-7.44 4.3c-.17.1-.39.1-.56 0l-1.85-1.12c-.11-.06-.24-.06-.32 0-.23.18-.27.22-.59.33-.14.05-.35.12-.35.29 0 .15.15.24.4.37l2.37 1.37c.27.13.57.2.88.2s.61-.07.88-.2l7.44-4.3c.48-.28.78-.8.78-1.36V8.41c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z"/></svg>, color: '#339933' },
          { name: 'MongoDB', level: 70, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46.85 0 1.31-.52 1.31-1.42V9.47c0-.13-.11-.24-.24-.24H7.52c-.13 0-.24.11-.24.24v8.04c0 .43-.45.83-1.18.83-.31 0-.57-.07-.76-.15l-1.9-1.09c-.17-.1-.28-.29-.28-.49V8.41c0-.2.11-.39.28-.49l7.44-4.3c.17-.1.39-.1.56 0l7.44 4.3c.17.1.28.29.28.49v8.2c0 .2-.11.39-.28.49l-7.44 4.3c-.17.1-.39.1-.56 0l-1.85-1.12c-.11-.06-.24-.06-.32 0-.23.18-.27.22-.59.33-.14.05-.35.12-.35.29 0 .15.15.24.4.37l2.37 1.37c.27.13.57.2.88.2s.61-.07.88-.2l7.44-4.3c.48-.28.78-.8.78-1.36V8.41c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z"/></svg>, color: '#47A248' },
          { name: 'Express.js', level: 70, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1.85c-.27 0-.55.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46.85 0 1.31-.52 1.31-1.42V9.47c0-.13-.11-.24-.24-.24H7.52c-.13 0-.24.11-.24.24v8.04c0 .43-.45.83-1.18.83-.31 0-.57-.07-.76-.15l-1.9-1.09c-.17-.1-.28-.29-.28-.49V8.41c0-.2.11-.39.28-.49l7.44-4.3c.17-.1.39-.1.56 0l7.44 4.3c.17.1.28.29.28.49v8.2c0 .2-.11.39-.28.49l-7.44 4.3c-.17.1-.39.1-.56 0l-1.85-1.12c-.11-.06-.24-.06-.32 0-.23.18-.27.22-.59.33-.14.05-.35.12-.35.29 0 .15.15.24.4.37l2.37 1.37c.27.13.57.2.88.2s.61-.07.88-.2l7.44-4.3c.48-.28.78-.8.78-1.36V8.41c0-.56-.3-1.08-.78-1.36L12.78 2.05c-.23-.13-.51-.2-.78-.2z"/></svg>, color: '#000000' },
          { name: 'Machine Learning', level: 80, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF6F00' },
          { name: 'Deep Learning', level:50,icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF6F00' },
          { name: 'Natural Language Processing', level: 70, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF6F00' },
          { name: 'AI Agents', level: 65, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF6F00' }
        ],
        'Hardware Skills': [
          { name: 'Arduino', level: 92, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.82 12c0 6.52-5.3 11.82-11.82 11.82S.18 18.52.18 12 5.48.18 12 .18 23.82 5.48 23.82 12zM12 2.18C6.58 2.18 2.18 6.58 2.18 12S6.58 21.82 12 21.82 21.82 17.42 21.82 12 17.42 2.18 12 2.18z"/></svg>, color: '#00979D' },
          { name: 'Raspberry Pi', level: 88, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>, color: '#C51A4A' },
          { name: 'Circuit Design', level: 80, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF6B6B' },
          { name: 'Verilog HDL', level: 95, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#4CAF50' },
          { name: 'FPGA Programming', level: 20, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#8B0000' },
          { name: 'Embedded Systems', level: 30, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#4682B4' },
          { name: 'Robotics', level: 75, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#A9A9A9' },
          { name: 'Sensor Integration', level: 70, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#DAA520' },
          { name: 'PCB Design', level: 60, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#2F4F4F' },
          { name: 'Microcontrollers', level: 90, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#800080' },
          { name: 'Digital Logic', level: 95, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#00CED1' },
          { name: 'Analog Circuits', level: 90, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#FF8C00' },
          { name: 'ESP3266 (Node MCU)', level: 85, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#483D8B' },
          { name: 'Optical Fibres', level: 70, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#3CB371' },
          { name: 'IoT Devices', level: 100,icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#3CB371' }
        ]
      }
    },
    {
      title: 'Tools',
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
      skills: {
        'Software Tools': [
          { name: 'VS Code', level: 95, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>, color: '#007ACC' },
          { name: 'Git & GitHub', level: 90, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>, color: '#181717' },
          { name: 'N8N', level: 70, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, color: '#FF6F00' }
        ],
        'Hardware Tools': [
          { name: 'TinkerCad', level: 80, icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, color: '#FF6F00' },
          { name: 'Arduino IDE', level: 90, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M23.82 12c0 6.52-5.3 11.82-11.82 11.82S.18 18.52.18 12 5.48.18 12 .18 23.82 5.48 23.82 12zM12 2.18C6.58 2.18 2.18 6.58 2.18 12S6.58 21.82 12 21.82 21.82 17.42 21.82 12 17.42 2.18 12 2.18z"/></svg>, color: '#00979D' },
          { name: 'ModelSim', level: 85, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#4CAF50' },
          { name: 'Xilinx Vivado', level: 88, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>, color: '#8B0000' },
          { name: 'Raspberry Pi OS', level: 82, icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>, color: '#C51A4A' }
        ]
      }
    }
  ];

  const handleSectionChange = (newSection: string) => {
    setActiveSection(newSection);
    // Set the active category to the first available category in the new section
    const newCategory = Object.keys(skillCategories.find(cat => cat.title === newSection)?.skills || {})[0];
    setActiveCategory(newCategory);
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-4">Skills & Expertise</h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            A comprehensive overview of my technical abilities and professional competencies
          </p>
        </motion.div>

        {/* Main Category Tabs */}
        <div className="flex flex-wrap justify-center mb-8 gap-2 sm:gap-4">
          {skillCategories.map((category) => (
            <motion.button
              key={category.title}
              onClick={() => handleSectionChange(category.title)}
              className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base transition-all ${
                activeSection === category.title
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.icon}
              <span>{category.title}</span>
            </motion.button>
          ))}
        </div>

        {/* Sub-category Tabs */}
        <div className="flex flex-wrap justify-center mb-10 gap-2 sm:gap-4">
          {Object.keys(skillCategories.find(cat => cat.title === activeSection)?.skills || {}).map((subCategory) => (
            <motion.button
              key={subCategory}
              onClick={() => setActiveCategory(subCategory)}
              className={`px-3 py-1 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base transition-all ${
                activeCategory === subCategory
                  ? 'bg-primary bg-opacity-20 text-primary'
                  : 'bg-white bg-opacity-5 text-gray-300 hover:bg-primary hover:bg-opacity-10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {subCategory}
            </motion.button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {skillCategories
            .find(cat => cat.title === activeSection)
            ?.skills[activeCategory]
            ?.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {applyGlass(
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${skill.color}22` }}
                      >
                        <div className="text-2xl" style={{ color: skill.color }}>
                          {skill.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-semibold">{skill.name}</h3>
                        <p className="text-sm text-gray-400">Proficiency: {skill.level}%</p>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-white bg-opacity-10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </div>,
                  { borderRadius: '9999px', hoverEffect: true }
                )}
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;