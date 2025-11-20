# Setup & Implement Traefik for INGRESS & INGRESS ROUTE

### Install Traefik via Helm chart

```bash
helm repo add traefik https://helm.traefik.io/traefik
helm repo update
```

### Update the default values.yaml to activate ingress and ingress route

```bash
helm show values traefik/traefik > values.yaml
nano values.yaml
```

### Modify the values.yaml

```bash
ingressClass:
  enabled: true
  isDefaultClass: true
service:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-type: nlb
globalArguments:
- "--api.insecure=true"
```

### Update/Install with new value.yaml

```bash
helm install traefik traefik/traefik --create-namespace --namespace=traefik --values=values.yaml



helm upgrade --install traefik traefik/traefik --namespace traefik --values values.yaml
```


### Check traefik pod and LB assigned to it or not 

```bash
kubectl get service -n traefik
```

### Lets deploy our app manifests

```bash
kubectl apply -f k8s/app/
```

### Now lets deploy ingress

```bash
kubectl apply -f traefik/ingress.yaml
```

### Some Info about INGRESS ROUTE

```bash

In Traefik, an IngressRoute is a Custom Resource Definition (CRD) that defines
how incoming requests are routed to services within a Kubernetes cluster.
It is a Traefik-specific resource that offers more advanced routing capabilities compared to the standard Kubernetes Ingress resource.

Here's a breakdown of what an IngressRoute entails:


Custom Resource Definition (CRD):

IngressRoutes are not part of the standard Kubernetes API but are defined and managed by Traefik.
You need to apply Traefik's Kubernetes CRDs to your cluster to enable their use.

Enhanced Routing:

IngressRoutes allow for more sophisticated routing rules than the basic host and path-based routing offered by Kubernetes Ingress.

This includes features like:

Middleware integration: Applying various middlewares (e.g., authentication, rate limiting, header manipulation) to requests before they reach the backend service.

Advanced rule matching: Beyond host and path, you can define rules based on headers, methods, and more.

Service load balancing: Configuring how traffic is distributed among multiple instances of a service. 

HTTP, TCP, and UDP support:

Traefik provides different IngressRoute CRDs for various protocols:
        IngressRoute for HTTP routing.
        IngressRouteTCP for TCP routing.
        IngressRouteUDP for UDP routing.
```


### Now lets deploy ingress route

```bash
kubectl apply -f traefik/ingress-route.yaml
```
