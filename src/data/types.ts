export interface Tool {
  name: string;
  url?: string;
  description: string;
}

export interface Module {
  id: string;
  title: string;
  titleEn: string;
  unit: string;
  unitId: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  description: string;
  objectives: string[];
  theory: string;
  toolbox: Tool[];
  mission: {
    title: string;
    scenario: string;
    steps: string[];
    hint: string;
    flag?: string;
  };
  proTip: string;
  ethicsNote: string;
}

export interface Unit {
  id: string;
  title: string;
  icon: string;
  color: string;
  modules: string[];
}
