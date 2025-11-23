import React from "react";
import ServiceCard, { ServiceCardProps } from "./ServiceCard";

export default function BentoGrid({
  services,
}: {
  services: ServiceCardProps[];
}) {
  return (
    <div className="grid auto-rows-[minmax(140px,auto)] gap-4 md:grid-cols-4">
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          title={service.title}
          description={service.description}
          icon={service.icon}
          href={service.href}
          badge={service.badge}
          emphasis={service.emphasis}
        />
      ))}
    </div>
  );
}
