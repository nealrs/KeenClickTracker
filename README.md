KeenClickTracker
================

A basic email click tracker powered by [Keen.io](http://keen.io). Why? _Why not._

**Setup**

Add your API keys, project ID, and target event collection to `main.js` and then launch `index.html`.

**Creating a tracking link**

1. Define redirect URL (the link you want to track)
2. Add optional secondary parameters (ip/geo-ip are automatically collected)
3. Uncheck _TEST_ & click to 'Create tracking link'
4. Copy and paste, _but don't click_, the link into your email.

**View your report**

Click 'Refresh' link or wait for 2 min auto-refresh. Every click (even your own) will be recorded along with date & time, ip, and the best guess for city/country.

**Ideas for improvement**

- Create dropdowns/options for multiple collections so each user has their own collection.
- Security?
- Better styling & CSS cleanup
- Expose more tracking parameters
- Add more default tracking parameters
- Sortable columns (implemented this earlier, but didn't like it)
- Your feedback here.
