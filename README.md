# Game hub using React + TypeScript + Chakra + Vite + RAWG api

Portal powered by React (using Vite scaffolding) and a custom API to browse the RAWG game database.
Visit the production endpoint at: https://gamers-hub.azurewebsites.net

Visit Api backend source code at my [GamersHub-Api repo](https://github.com/LuisMSuarez/GameHub-Api) 

## Design highlights

- Responsive UX: Great browsing experience on mobile, tablet and desktop
- Usage of Chakra UX layout and components
- Dark mode switch
- Content pagination with infinite scrolling
- Usage of popular libraries such as Zustand, React router, React icon
- Client-side API retries and caching using React Query (Tanstack Query)
- Game recommendations based on user tagging and LLM OpenAI integration
- Translation of game description to 137 languages using Azure AI cognitive services
- CI/CD github action to run build, execute tests, build and publish container images and deploy to Azure App Service

## Architecture diagram:

<img width="1954" height="1661" alt="GamersHub" src="https://github.com/user-attachments/assets/047fb7f9-af51-47f3-9b30-9d32a721b4fd" />


## Screenshots

### Homepage

<img width="2216" height="1662" alt="image" src="https://github.com/user-attachments/assets/87387bc5-3a32-42fc-9bf3-26688f5efd71" />

### Game details page

<img width="2210" height="1552" alt="image" src="https://github.com/user-attachments/assets/0835fe2b-adf4-4dee-af65-b5462f7e5e7e" />

### Game discovery

<img width="2196" height="1408" alt="screenshot-discovery" src="https://github.com/user-attachments/assets/d9ab0ee4-d2cb-4b0d-ae51-d120b8c43aea" />






