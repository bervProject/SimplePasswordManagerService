ARG APP_NAME=SimplePasswordManagerService

FROM mcr.microsoft.com/dotnet/sdk:8.0-preview-alpine AS build-env
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore
# Build and publish a release
RUN dotnet publish $APP_NAME -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0-preview-alpine
WORKDIR /App
COPY --from=build-env /App/out .
ENTRYPOINT ["dotnet", "$APP_NAME.dll"]
