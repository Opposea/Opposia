// Maps quiz answers to fun profile badges

export interface QuizBadge {
  label: string;
  emoji: string;
  color: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

// Map of question_id -> answer -> badge
const badgeMap: Record<string, Record<string, QuizBadge>> = {
  cooking: {
    'love': { label: 'Loves to Cook', emoji: '👨‍🍳', color: 'primary' },
    'sometimes': { label: 'Occasional Chef', emoji: '🍳', color: 'warning' },
    'rather-not': { label: 'Kitchen Avoider', emoji: '🍕', color: 'secondary' },
    'together': { label: 'Cooking Partner', emoji: '👩‍🍳', color: 'success' },
  },
  dishes: {
    'dont-mind': { label: 'Clean Freak', emoji: '✨', color: 'primary' },
    'sometimes': { label: 'Sometimes Tidy', emoji: '🧹', color: 'warning' },
    'dont-enjoy': { label: 'Dish Dodger', emoji: '🍽️', color: 'secondary' },
    'together': { label: 'Team Tidy', emoji: '🧽', color: 'success' },
  },
  driving: {
    'main-driver': { label: 'Road Captain', emoji: '🚗', color: 'primary' },
    'share': { label: 'Shares the Wheel', emoji: '🛣️', color: 'warning' },
    'rather-not': { label: 'Happy Passenger', emoji: '🎧', color: 'secondary' },
    'together': { label: 'Co-Pilot Crew', emoji: '🗺️', color: 'success' },
  },
  finances: {
    'lead': { label: 'Money Manager', emoji: '💰', color: 'primary' },
    'share': { label: 'Shares Finances', emoji: '💵', color: 'warning' },
    'rather-not': { label: 'Budget Free', emoji: '💳', color: 'secondary' },
    'together': { label: 'Finance Team', emoji: '📊', color: 'success' },
  },
  planning_events: {
    'organiser': { label: 'Party Planner', emoji: '🎉', color: 'primary' },
    'sometimes': { label: 'Occasional Planner', emoji: '📆', color: 'warning' },
    'rather-not': { label: 'Goes with Flow', emoji: '🌊', color: 'secondary' },
    'together': { label: 'Plan Together', emoji: '📅', color: 'success' },
  },
  fixing_things: {
    'fixer': { label: 'Handy Helper', emoji: '🔧', color: 'primary' },
    'basics': { label: 'Can Help Out', emoji: '🪛', color: 'warning' },
    'not-my-thing': { label: 'Calls for Help', emoji: '📞', color: 'secondary' },
    'together': { label: 'DIY Duo', emoji: '🛠️', color: 'success' },
  },
  decorating: {
    'love-lead': { label: 'Interior Designer', emoji: '🎨', color: 'primary' },
    'sometimes': { label: 'Style Collaborator', emoji: '🖼️', color: 'warning' },
    'not-into-it': { label: 'Decor Delegate', emoji: '🏠', color: 'secondary' },
    'together': { label: 'Style Team', emoji: '🪴', color: 'success' },
  },
  grocery_shopping: {
    'dont-mind': { label: 'Grocery Pro', emoji: '🛒', color: 'primary' },
    'sometimes': { label: 'Shares Shopping', emoji: '🛍️', color: 'warning' },
    'dont-enjoy': { label: 'Shop Shy', emoji: '📦', color: 'secondary' },
    'together': { label: 'Shop Together', emoji: '🥬', color: 'success' },
  },
  customer_service: {
    'yes': { label: 'Problem Solver', emoji: '📱', color: 'primary' },
    'share': { label: 'Shares the Calls', emoji: '📲', color: 'warning' },
    'prefer-partner': { label: 'Phone Phobic', emoji: '🙈', color: 'secondary' },
    'together': { label: 'Team Calls', emoji: '📞', color: 'success' },
  },
  making_bed: {
    'matters': { label: 'Bed Maker', emoji: '🛏️', color: 'primary' },
    'sometimes': { label: 'Sometimes Tidy', emoji: '🌅', color: 'warning' },
    'rarely': { label: 'Cozy Chaos', emoji: '😴', color: 'secondary' },
    'together': { label: 'Morning Routine', emoji: '☀️', color: 'success' },
  },
  gardening: {
    'enjoy-lead': { label: 'Green Thumb', emoji: '🌱', color: 'primary' },
    'sometimes': { label: 'Garden Helper', emoji: '🌿', color: 'warning' },
    'not-for-me': { label: 'Indoor Soul', emoji: '🏡', color: 'secondary' },
    'together': { label: 'Garden Partners', emoji: '🌻', color: 'success' },
  },
  packing_trips: {
    'planner': { label: 'Packing Pro', emoji: '🧳', color: 'primary' },
    'pack-fine': { label: 'Flexible Packer', emoji: '👜', color: 'warning' },
    'last-minute': { label: 'Last Minute', emoji: '⏰', color: 'secondary' },
    'together': { label: 'Pack Together', emoji: '✈️', color: 'success' },
  },
  planning_birthdays: {
    'love-lead': { label: 'Party Planner', emoji: '🎂', color: 'primary' },
    'contribute': { label: 'Celebration Helper', emoji: '🎈', color: 'warning' },
    'not-great': { label: 'Surprise Me', emoji: '🎁', color: 'secondary' },
    'together': { label: 'Celebrate Together', emoji: '🥳', color: 'success' },
  },
  picking_movies: {
    'chooser': { label: 'Movie Picker', emoji: '🎬', color: 'primary' },
    'easy': { label: 'Easy Going', emoji: '🎞️', color: 'warning' },
    'rather-not': { label: 'Anything Works', emoji: '🍿', color: 'secondary' },
    'together': { label: 'Film Friends', emoji: '📺', color: 'success' },
  },
  initiating_social: {
    'me': { label: 'Social Butterfly', emoji: '🦋', color: 'primary' },
    'sometimes': { label: 'Sometimes Social', emoji: '👋', color: 'warning' },
    'usually-not': { label: 'Happy Homebody', emoji: '🏠', color: 'secondary' },
    'together': { label: 'Social Team', emoji: '👫', color: 'success' },
  },
};

export interface QuizAnswer {
  question_id: string;
  answer: string;
}

/**
 * Generate profile badges from quiz answers
 * Returns up to maxBadges badges, prioritizing the most interesting ones
 */
export function generateBadgesFromQuizAnswers(
  quizAnswers: QuizAnswer[],
  maxBadges: number = 5
): QuizBadge[] {
  const badges: QuizBadge[] = [];

  for (const qa of quizAnswers) {
    const questionBadges = badgeMap[qa.question_id];
    if (questionBadges && questionBadges[qa.answer]) {
      badges.push(questionBadges[qa.answer]);
    }
  }

  // Return up to maxBadges, prioritizing variety
  return badges.slice(0, maxBadges);
}

/**
 * Get badge color class based on badge color type
 */
export function getBadgeColorClass(color: QuizBadge['color']): string {
  switch (color) {
    case 'primary':
      return 'bg-primary/10 text-primary border-primary/20';
    case 'secondary':
      return 'bg-secondary text-secondary-foreground';
    case 'success':
      return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'warning':
      return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    default:
      return '';
  }
}
