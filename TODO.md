# TODO: Replace Static Data

Below is a list of identified static data points that need to be replaced with dynamic data sources:

- **`app/(tabs)/ProfileScreen.tsx`**:
    - `mockActivityDates`: Array simulating user activity dates.
    - Profile details: `name`, `bio`, `joinedText`, `avatar uri`, `level`.
    - `currentStreak`, `totalLessons` values passed to `ActivityCalendar`.
    - Journey distribution pie chart values and labels.
    - Recent activity details (`activityTitle`, `activityTime`).

- **`app/screens/PathScreen.tsx`**:
    - `mockLessons`: Array of lesson objects (title, description, duration, completed status, icon).
    - Relies on path data passed as params, check origin (`ContinueScreen.tsx`).
    - Placeholder audio URL (`require('../../assets/audio/meditation.mp3')`) used in `AudioPlayerSheet`.

- **`app/components/DailyStreak.tsx`**:
    - `weekDays` array.
    - Example `currentStreak` and `completedDays`.
    - Static text in the "practice card".

- **`app/(tabs)/DailyScreen.tsx`**:
    - Hardcoded stats values and labels (Kindness, Prayer, Scripture, Wisdom).
    - Hardcoded upcoming event details.
    - Hardcoded daily virtue details.

- **`app/(tabs)/index.tsx`**:
    - `learningPaths`: Array of example path data objects.
    - Hardcoded stats preview values (Lesson Streak, Scripture).
    - Hardcoded data for the `LessonCard` in the "Continue Learning" section.

- **`app/components/StatsCard.tsx`**:
    - Hardcoded stats values (Streak, Lessons, Hours, Completion).

- **`app/(tabs)/ContinueScreen.tsx`**:
    - `pathData` object defining a specific path, passed to `PathScreen`.

- **`app/components/StreakCalendar.tsx`**:
    - `DAYS_OF_WEEK` array.

- **`app/components/PathCard.tsx`**:
    - `getPathStyles` function returns hardcoded style objects based on path ID.

- **`app/(tabs)/QuickListenScreen.tsx`**:
    - `quickListens` array defining static audio items.
    - Hardcoded data in the "Featured Daily Audio" section (title, subtitle, duration, image URL).
