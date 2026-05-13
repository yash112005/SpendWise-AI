1. Hardest bug

The hardest bug was a deployment issue where the frontend worked locally but API requests failed in production with 404 errors.

Initially, I thought the backend routes were broken because the endpoints worked in Postman but not from the deployed frontend. I checked CORS multiple times, changed route paths, and even rewrote some API handlers.

Then I realized the real issue was that the frontend was still calling localhost URLs after deployment. The environment variables on the frontend were incorrect and Vercel could not access my local backend.

What finally fixed it:

deploying the backend separately
adding proper environment variables
using NEXT_PUBLIC_API_URL
rebuilding the frontend after updating env variables

That bug taught me the difference between local development and production environments.



2. Decision I reversed

Initially, I wanted to add many advanced features and make the UI highly animated.

After some time, I realized it was slowing development and making the app feel cluttered. I removed several unnecessary UI effects and focused more on clarity, speed, and usability.

Reversing that decision improved:

performance
readability
mobile responsiveness
development speed

It also made the project feel more professional.



3. What I would build in Week 2

If I had another week, I would add:

1.authentication
2.saved audit history
3.PDF export for reports
4.team collaboration
5.better charts and analytics
6.real API integrations for pricing
7.usage tracking dashboard
8.automated optimization recommendations

I would also spend more time improving testing and deployment reliability.



4. How I used AI tools

I used AI tools mainly for:

1.debugging
2.understanding unfamiliar concepts
3.improving UI structure
4.generating starter boilerplate
5.fixing deployment/configuration issues

But I did not blindly trust AI outputs.

One example where AI was wrong:
It suggested code that worked locally but failed in production because environment variables were handled incorrectly. I had to manually debug the deployment logs and understand the issue myself.

I learned that AI is very useful for speed, but understanding the underlying system is still necessary.



5. Self-rating
Skill	              Rating	    Reason
Discipline	        9/10	     Consistently worked on the project and kept improving it daily
Code Quality	      7.5/10	     Good structure overall, but still room for cleaner abstractions and testing
Design	            8/10	     UI became cleaner over time, though some parts could still be polished
Problem-solving	    8/10	     Managed deployment, backend, and integration issues independently
Entrepreneurial Thinking	9/10	Focused on solving a real cost-analysis problem and presenting it clearly