# How to Run Locally

#### Backend:

Navigate to backend/

```
Run npm install
```

Create a .env file

```
MONGO_URI=mongodb://localhost:27017/mern-todo.
```

```
npm start (ensure MongoDB is running locally).
```

#### Frontend:

Navigate to frontend/.


```
Run npm install
```

```
npm start (proxies requests to http://localhost:5000).
```


#### Docker:

Build and run backend: 

```
docker build -t mern-todo-backend . && docker run -p 5000:5000 --env-file .env mern-todo-backend.
```

Build and run frontend: 

```
docker build -t mern-todo-frontend . && docker run -p 80:80 mern-todo-frontend.
```

```
Ensure MongoDB is running (e.g., docker run -d -p 27017:27017 mongo).
```


# How to setup and implement ingress (ingress controller)

#### Add Ingress Controller to Cluster

```
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx

helm install ingress-nginx ingress-nginx/ingress-nginx

```

# How to setup and implement gateway api

## **Step 1: Install Gateway API CRDs**

The Gateway API introduces several new resource types that NGF uses. Install them with:

```bash
kubectl kustomize "https://github.com/nginx/nginx-gateway-fabric/config/crd/gateway-api/standard?ref=v2.1.0" | kubectl apply -f -
```


**What gets installed (1-liners):**

* **GatewayClass** – Defines a class of gateways (cluster-wide template for data planes)
* **Gateway** – An instance of a GatewayClass (control plane + network listener config)
* **HTTPRoute** – Rules mapping incoming HTTP requests to backend services
* **GRPCRoute** – Same as HTTPRoute but for gRPC traffic
* **ReferenceGrant** – Allows cross-namespace resource referencing

Verify:

```bash
kubectl api-resources | grep gateway
```

> NGF currently supports `HTTPRoute` and `GRPCRoute` from the Gateway API’s standard channel.

## **Step 2: Install the NGINX Gateway Fabric Controller**

```bash
helm install ngf oci://ghcr.io/nginx/charts/nginx-gateway-fabric \
  --create-namespace -n gw-api-nginx \
  --set nginx.service.type=LoadBalancer
```

Verify:

```bash
kubectl get deploy -n gw-api-nginx
```

You should see:

```
deployment.apps/ngf-nginx-gateway-fabric
```

**GatewayClass auto-created:**

```bash
kubectl get gatewayclasses.gateway.networking.k8s.io -o wide
```

```
NAME    CONTROLLER                                   ACCEPTED   AGE   DESCRIPTION
nginx   gateway.nginx.org/nginx-gateway-controller   True       12m
```

> **Note:** GatewayClasses are cluster-scoped. Any namespace can reference them.

## **Step 3: Deploy the App**

```
Kubectl apply -f app/
```

## **Step 4: Create the Gateway and httproutes**

```
Kubectl apply -f gw-api/
```
