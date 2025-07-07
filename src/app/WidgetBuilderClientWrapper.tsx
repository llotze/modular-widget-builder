"use client";
import WidgetBuilderPage from "./components/client/WidgetBuilderPage";

export default function WidgetBuilderClientWrapper({ email }: { email: string }) {
  return <WidgetBuilderPage email={email} />;
}