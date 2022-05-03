FROM node:14 as frontend
WORKDIR /frontend
COPY /frontend .
RUN npm i
RUN npm run build --prod

FROM node:14 as server
WORKDIR /backend
COPY /backend .
COPY --from=frontend /frontend/dist/frontend ./frontend
RUN npm i
ENV PORT 3200
EXPOSE 3200
CMD ["npm", "start"]