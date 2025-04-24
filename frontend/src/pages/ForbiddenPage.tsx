import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ForbiddenPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-background">
    <h1 className="text-4xl font-bold mb-4 text-destructive">403 - Forbidden</h1>
    <p className="mb-6 text-lg text-muted-foreground">You do not have permission to access this page.</p>
    <Button asChild>
      <Link to="/">Go Home</Link>
    </Button>
  </div>
);

export default ForbiddenPage;
