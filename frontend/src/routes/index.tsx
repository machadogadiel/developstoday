import Home from "@/pages/HomePage";
import { createFileRoute } from "@tanstack/react-router";
export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Home />;
}
