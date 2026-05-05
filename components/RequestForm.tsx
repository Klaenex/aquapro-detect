"use client";

import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { ServiceFormType } from "@/lib/content";
import { CONTACT } from "@/lib/content";
import {
  getFormsUrl,
  getSiteUrl,
  isFormsSubmissionSuccessful,
  parseFormsResponse,
} from "@/lib/forms";
import styles from "./RequestForm.module.scss";

type Props = {
  serviceTitle: string;
  serviceCategory: string;
  serviceSlug: string;
  formType: ServiceFormType;
};

type Status = "idle" | "loading" | "ok" | "error";

type SelectedPhoto = {
  file: File;
  id: string;
  previewUrl: string;
};

type SelectedPlan = {
  file: File;
  previewUrl: string | null;
};

const urgenceOptionsByType: Record<
  ServiceFormType,
  Array<{ value: string; label: string }>
> = {
  debouchage: [
    { value: "immediate", label: "Immédiate" },
    { value: "aujourdhui", label: "Aujourd'hui" },
    { value: "24-48h", label: "24–48h" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  fuite: [
    { value: "immediate", label: "Immédiate" },
    { value: "aujourdhui", label: "Aujourd'hui" },
    { value: "24-48h", label: "24–48h" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  inspection: [
    { value: "aujourdhui", label: "Aujourd'hui" },
    { value: "24-48h", label: "24–48h" },
    { value: "cette-semaine", label: "Cette semaine" },
    { value: "non-urgente", label: "Non urgente" },
  ],
  nettoyage: [
    { value: "24-48h", label: "24–48h" },
    { value: "cette-semaine", label: "Cette semaine" },
    { value: "date-a-definir", label: "À définir" },
  ],
  generic: [
    { value: "non-urgente", label: "Non urgente" },
    { value: "24-48h", label: "24–48h" },
  ],
};

function labelForType(formType: ServiceFormType) {
  switch (formType) {
    case "debouchage":
      return "Débouchage / Urgence";
    case "fuite":
      return "Fuite / Humidité";
    case "inspection":
      return "Inspection / Égouts";
    case "nettoyage":
      return "Nettoyage / Sinistre";
    default:
      return "Demande";
  }
}

const BIEN_OPTIONS = [
  { value: "maison", label: "Maison" },
  { value: "appartement", label: "Appartement" },
  { value: "commerce", label: "Commerce / Pro" },
];

const DAYS = [
  { value: "Lundi", label: "Lun" },
  { value: "Mardi", label: "Mar" },
  { value: "Mercredi", label: "Mer" },
  { value: "Jeudi", label: "Jeu" },
  { value: "Vendredi", label: "Ven" },
  { value: "Samedi", label: "Sam" },
];

const HORAIRES = [
  { value: "Matin (8h–12h)", label: "Matin" },
  { value: "Après-midi (12h–17h)", label: "Après-midi" },
  { value: "Soir (17h–20h)", label: "Soir" },
];

export default function RequestForm({
  serviceTitle,
  serviceCategory,
  serviceSlug,
  formType,
}: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState<string>("");

  // Photos
  const [selectedPhotos, setSelectedPhotos] = useState<SelectedPhoto[]>([]);
  const photosInputRef = useRef<HTMLInputElement | null>(null);
  const selectedPhotosRef = useRef<SelectedPhoto[]>([]);
  const [isDraggingPhotos, setIsDraggingPhotos] = useState(false);

  // Plan
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const planInputRef = useRef<HTMLInputElement | null>(null);
  const selectedPlanRef = useRef<SelectedPlan | null>(null);
  const [isDraggingPlan, setIsDraggingPlan] = useState(false);

  // Controlled fields
  const [phoneValue, setPhoneValue] = useState("");
  const [descValue, setDescValue] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  const descMaxLength = 1200;

  const urgenceOptions = useMemo(
    () => urgenceOptionsByType[formType],
    [formType]
  );

  const showAssurance = formType === "fuite" || formType === "inspection";
  const showFuiteExtras = formType === "fuite";
  const showInspectionExtras = formType === "inspection";
  const showPlan = serviceSlug === "inspection-camera";
  const showNettoyageExtras = formType === "nettoyage";
  const maxPhotos = 5;
  const maxPhotoSizeBytes = 8 * 1024 * 1024;
  const isUrgenceType = formType === "debouchage";

  useEffect(() => {
    selectedPhotosRef.current = selectedPhotos;
  }, [selectedPhotos]);

  useEffect(() => {
    selectedPlanRef.current = selectedPlan;
  }, [selectedPlan]);

  useEffect(() => {
    return () => {
      for (const photo of selectedPhotosRef.current) {
        URL.revokeObjectURL(photo.previewUrl);
      }
      if (selectedPlanRef.current?.previewUrl) {
        URL.revokeObjectURL(selectedPlanRef.current.previewUrl);
      }
    };
  }, []);

  function onPhoneChange(e: ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.trim();
    // Keep + for prefix detection, strip everything else non-digit
    let cleaned = raw.replace(/[^\d+]/g, "");
    if (cleaned.startsWith("+32")) {
      cleaned = "0" + cleaned.slice(3).replace(/\D/g, "");
    } else if (cleaned.startsWith("0032")) {
      cleaned = "0" + cleaned.slice(4);
    } else {
      cleaned = cleaned.replace(/\D/g, "");
    }
    const digits = cleaned.slice(0, 10);
    let formatted = digits;
    if (digits.length > 4)
      formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
    if (digits.length > 6)
      formatted = `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
    if (digits.length > 8)
      formatted = `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
    setPhoneValue(formatted);
  }

  function toggleDay(day: string) {
    setSelectedDays((current) =>
      current.includes(day)
        ? current.filter((d) => d !== day)
        : [...current, day]
    );
  }

  function toggleHour(hour: string) {
    setSelectedHours((current) =>
      current.includes(hour)
        ? current.filter((h) => h !== hour)
        : [...current, hour]
    );
  }

  // ─── Photos handlers ───

  function addPhotoFiles(files: File[]) {
    setSelectedPhotos((current) => {
      const next = [...current];
      for (const file of files) {
        const id = `${file.name}-${file.size}-${file.lastModified}`;
        if (!next.some((ex) => ex.id === id)) {
          next.push({ file, id, previewUrl: URL.createObjectURL(file) });
        }
      }
      return next;
    });
  }

  function onPhotosChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    addPhotoFiles(files);
    e.target.value = "";
  }

  function onPhotosDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingPhotos(true);
  }

  function onPhotosDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggingPhotos(false);
    }
  }

  function onPhotosDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingPhotos(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length > 0) addPhotoFiles(files);
  }

  function removePhoto(indexToRemove: number) {
    setSelectedPhotos((current) => {
      const photoToRemove = current[indexToRemove];
      if (photoToRemove) URL.revokeObjectURL(photoToRemove.previewUrl);
      return current.filter((_, index) => index !== indexToRemove);
    });
  }

  // ─── Plan handlers ───

  function onPlanChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setSelectedPlan((current) => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      if (!file) return null;
      return {
        file,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      };
    });
    e.target.value = "";
  }

  function onPlanDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingPlan(true);
  }

  function onPlanDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDraggingPlan(false);
    }
  }

  function onPlanDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingPlan(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    setSelectedPlan((current) => {
      if (current?.previewUrl) URL.revokeObjectURL(current.previewUrl);
      return {
        file,
        previewUrl: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : null,
      };
    });
  }

  function removePlan() {
    if (selectedPlan?.previewUrl) URL.revokeObjectURL(selectedPlan.previewUrl);
    setSelectedPlan(null);
    if (planInputRef.current) planInputRef.current.value = "";
  }

  // ─── Submit ───

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setFeedback("");

    const fd = new FormData(e.currentTarget);
    const hp = String(fd.get("website") || "");
    if (hp.trim().length > 0) {
      setStatus("ok");
      window.location.href = getSiteUrl(
        `/merci?service=${encodeURIComponent(serviceTitle)}`
      );
      return;
    }

    const adresseRue = String(fd.get("adresseRue") || "").trim();
    const adresseCodePostal = String(fd.get("adresseCodePostal") || "").trim();
    const adresseVille = String(fd.get("adresseVille") || "").trim();
    const adresse = [adresseRue, adresseCodePostal, adresseVille]
      .filter(Boolean)
      .join(", ");

    const disponibilites =
      selectedDays.length > 0 || selectedHours.length > 0
        ? [
            selectedDays.join(", "),
            selectedHours.join(", "),
          ]
            .filter(Boolean)
            .join(" — ")
        : "";

    const payload = {
      description: String(fd.get("description") || ""),
      urgence: String(fd.get("urgence") || ""),
      logement: String(fd.get("logement") || ""),
      etage: String(fd.get("etage") || ""),
      adresse,
      disponibilites,
      paiement: String(fd.get("paiement") || ""),
      nom: String(fd.get("nom") || ""),
      telephone: String(fd.get("telephone") || ""),
      email: String(fd.get("email") || ""),
      fuiteType: String(fd.get("fuiteType") || ""),
      signes: String(fd.get("signes") || ""),
      assurance: String(fd.get("assurance") || ""),
      acces: String(fd.get("acces") || ""),
      odeurs: String(fd.get("odeurs") || ""),
      assuranceInspection: String(fd.get("assuranceInspection") || ""),
      contexteNettoyage: String(fd.get("contexteNettoyage") || ""),
      niveau: String(fd.get("niveau") || ""),
      evacuation: String(fd.get("evacuation") || ""),
    };

    if (
      !payload.description.trim() ||
      !payload.nom.trim() ||
      !payload.telephone.trim() ||
      !payload.email.trim()
    ) {
      setStatus("error");
      setFeedback("Merci de compléter les champs obligatoires.");
      return;
    }

    if (!adresseRue || !adresseCodePostal || !adresseVille) {
      setStatus("error");
      setFeedback("Merci de compléter l'adresse complète (rue, code postal et ville).");
      return;
    }

    if (selectedDays.length === 0) {
      setStatus("error");
      setFeedback("Merci d'indiquer au moins un jour de disponibilité.");
      return;
    }

    let normalizedPhone = payload.telephone.replace(/[\s\-\.\/\(\)]/g, "");
    if (normalizedPhone.startsWith("+32")) {
      normalizedPhone = "0" + normalizedPhone.slice(3);
    } else if (normalizedPhone.startsWith("0032")) {
      normalizedPhone = "0" + normalizedPhone.slice(4);
    }
    if (!/^0\d{8,9}$/.test(normalizedPhone)) {
      setStatus("error");
      setFeedback(
        "Numéro de téléphone invalide. Format belge attendu, ex : 0471 32 57 24."
      );
      return;
    }

    const photos = selectedPhotos.map((p) => p.file);

    if (photos.length > maxPhotos) {
      setStatus("error");
      setFeedback(`Merci de sélectionner au maximum ${maxPhotos} photos.`);
      return;
    }

    for (const photo of photos) {
      if (!photo.type.startsWith("image/")) {
        setStatus("error");
        setFeedback("Seuls les fichiers image sont acceptés.");
        return;
      }
      if (photo.size > maxPhotoSizeBytes) {
        setStatus("error");
        setFeedback("Chaque photo doit faire moins de 8 Mo.");
        return;
      }
    }

    if (selectedPlan) {
      const allowedPlanTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
      ];
      if (!allowedPlanTypes.includes(selectedPlan.file.type)) {
        setStatus("error");
        setFeedback("Le plan doit être un fichier PDF, JPG, PNG ou WEBP.");
        return;
      }
      if (selectedPlan.file.size > 10 * 1024 * 1024) {
        setStatus("error");
        setFeedback("Le plan doit faire moins de 10 Mo.");
        return;
      }
    }

    try {
      const requestData = new FormData();
      requestData.append(
        "meta",
        JSON.stringify({
          serviceTitle,
          serviceCategory,
          formType,
          page: typeof window !== "undefined" ? window.location.pathname : "",
          submittedAt: new Date().toISOString(),
        })
      );

      for (const [key, value] of Object.entries(payload)) {
        requestData.append(key, value);
      }

      requestData.append("website", hp);

      for (const photo of photos) {
        requestData.append("photos[]", photo, photo.name);
      }

      if (selectedPlan) {
        requestData.append("plan", selectedPlan.file, selectedPlan.file.name);
      }

      const res = await fetch(getFormsUrl("/forms/demande.php"), {
        method: "POST",
        body: requestData,
      });

      const json = await parseFormsResponse(res);
      if (!isFormsSubmissionSuccessful(res, json))
        throw new Error(json?.error || "Erreur serveur");

      setStatus("ok");
      for (const photo of selectedPhotos) URL.revokeObjectURL(photo.previewUrl);
      setSelectedPhotos([]);
      if (photosInputRef.current) photosInputRef.current.value = "";
      if (selectedPlan?.previewUrl) URL.revokeObjectURL(selectedPlan.previewUrl);
      setSelectedPlan(null);
      if (planInputRef.current) planInputRef.current.value = "";

      window.location.href = getSiteUrl(
        `/merci?service=${encodeURIComponent(serviceTitle)}`
      );
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.message
          ? error.message
          : "Désolé, l'envoi a échoué. Réessayez ou contactez-nous par téléphone."
      );
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      className={`${styles.card} ${styles.form}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.div
        className={styles.header}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.04 }}
      >
        <h2 className={styles.h2}>Demande d&apos;intervention</h2>
        <div className={`${styles.lead} ${styles.leadTight}`}>
          <strong>{serviceTitle}</strong> — {labelForType(formType)}
        </div>
      </motion.div>

      <p className={`${styles.lead} ${styles.leadTight} ${styles.requiredNote}`}>
        Les champs marqués <span aria-hidden="true">*</span>
        <span className="sr-only">d&apos;un astérisque</span> sont obligatoires.
      </p>

      {/* Honeypot anti-spam */}
      <div className={styles.honeypot} aria-hidden="true">
        <label className={styles.label} htmlFor="website">
          Website
        </label>
        <input
          id="website"
          name="website"
          className={styles.input}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* ─── Section 1 : Votre problème ─── */}
      <div className={styles.formSection}>
        <div className={styles.formSectionHeader}>
          <span className={styles.stepNum} aria-hidden="true">
            1
          </span>
          <span className={styles.stepLabel}>Votre problème</span>
        </div>

        {isUrgenceType ? (
          <motion.div
            className={`${styles.sectionCard} ${styles.urgentCard}`}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: 0.08 }}
          >
            <div className={styles.urgentTitle}>
              🚨 Urgence ? Appelez directement
            </div>
            <div className={`${styles.lead} ${styles.mt8}`}>
              <a
                className={`${styles.pill} ${styles.pillPrimary}`}
                href={`tel:${CONTACT.phone1.replace(/\s/g, "")}`}
              >
                {CONTACT.phone1}
              </a>{" "}
              <a
                className={styles.pill}
                href={`tel:${CONTACT.phone2.replace(/\s/g, "")}`}
              >
                {CONTACT.phone2}
              </a>
            </div>
            <div className={`${styles.lead} ${styles.mt10}`}>
              Pour un reflux important / débordement, l&apos;appel est plus
              rapide que le formulaire.
            </div>
          </motion.div>
        ) : null}

        <div className={styles.mt14}>
          <label className={styles.label}>Décrivez votre problème *</label>
          <textarea
            name="description"
            required
            className={styles.textarea}
            rows={5}
            placeholder="Ex: évier bouché, reflux, odeurs, fuite plafond, humidité mur…"
            maxLength={descMaxLength}
            value={descValue}
            onChange={(e) => setDescValue(e.target.value)}
          />
          <div className={styles.charCount}>
            {descValue.length} / {descMaxLength}
          </div>
        </div>

        <div className={styles.mt14}>
          <label className={styles.label}>Urgence *</label>
          <div className={styles.radioPills} role="radiogroup">
            {urgenceOptions.map((o) => (
              <label key={o.value} className={styles.radioPill}>
                <input
                  type="radio"
                  name="urgence"
                  value={o.value}
                  defaultChecked={o.value === urgenceOptions[0]?.value}
                  className={styles.radioPillInput}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.mt14}>
          <label className={styles.label}>Type de bien *</label>
          <div className={styles.radioPills} role="radiogroup">
            {BIEN_OPTIONS.map((o) => (
              <label key={o.value} className={styles.radioPill}>
                <input
                  type="radio"
                  name="logement"
                  value={o.value}
                  defaultChecked={o.value === "maison"}
                  className={styles.radioPillInput}
                />
                <span>{o.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`${styles.formGrid2} ${styles.mt14}`}>
          <div>
            <label className={styles.label}>Étage (si appartement)</label>
            <input name="etage" className={styles.input} placeholder="Ex: 2e" />
          </div>
          <div>
            <label className={styles.label}>Mode de paiement</label>
            <select
              name="paiement"
              className={styles.select}
              defaultValue="bancontact"
            >
              <option value="bancontact">Bancontact</option>
              <option value="cash">Cash</option>
            </select>
          </div>
        </div>

        {/* Extras FUITE */}
        {showFuiteExtras ? (
          <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>
              Infos complémentaires — fuite / humidité
            </div>
            <div className={styles.formGrid2}>
              <div>
                <label className={styles.label}>Type de fuite présumée</label>
                <select
                  name="fuiteType"
                  className={styles.select}
                  defaultValue="inconnu"
                >
                  <option value="inconnu">Inconnu</option>
                  <option value="eau">Eau</option>
                  <option value="chauffage">Chauffage</option>
                  <option value="toiture">Toiture</option>
                  <option value="enterree">Canalisation enterrée</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Signes visibles</label>
                <input
                  name="signes"
                  className={styles.input}
                  placeholder="Ex: taches, moisissures, odeur…"
                />
              </div>
            </div>
            {showAssurance ? (
              <div className={styles.mt12}>
                <label className={styles.label}>
                  Assurance déjà contactée ?
                </label>
                <div className={styles.radioPills} role="radiogroup">
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="assurance"
                      value="non"
                      defaultChecked
                      className={styles.radioPillInput}
                    />
                    <span>Non</span>
                  </label>
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="assurance"
                      value="oui"
                      className={styles.radioPillInput}
                    />
                    <span>Oui</span>
                  </label>
                </div>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* Extras INSPECTION */}
        {showInspectionExtras ? (
          <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>
              Infos complémentaires — inspection / égouts
            </div>
            <div className={styles.formGrid2}>
              <div>
                <label className={styles.label}>
                  Accès existant (regard, cave…)
                </label>
                <input
                  name="acces"
                  className={styles.input}
                  placeholder="Ex: regard extérieur, cave, garage…"
                />
              </div>
              <div>
                <label className={styles.label}>Odeurs présentes ?</label>
                <div className={styles.radioPills} role="radiogroup">
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="odeurs"
                      value="inconnu"
                      defaultChecked
                      className={styles.radioPillInput}
                    />
                    <span>Je ne sais pas</span>
                  </label>
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="odeurs"
                      value="oui"
                      className={styles.radioPillInput}
                    />
                    <span>Oui</span>
                  </label>
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="odeurs"
                      value="non"
                      className={styles.radioPillInput}
                    />
                    <span>Non</span>
                  </label>
                </div>
              </div>
            </div>

            {showAssurance ? (
              <div className={styles.mt12}>
                <label className={styles.label}>Assurance concernée ?</label>
                <div className={styles.radioPills} role="radiogroup">
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="assuranceInspection"
                      value="non"
                      defaultChecked
                      className={styles.radioPillInput}
                    />
                    <span>Non</span>
                  </label>
                  <label className={styles.radioPill}>
                    <input
                      type="radio"
                      name="assuranceInspection"
                      value="oui"
                      className={styles.radioPillInput}
                    />
                    <span>Oui</span>
                  </label>
                </div>
              </div>
            ) : null}

            {/* Plan de maison — uniquement pour inspection caméra des égouts */}
            {showPlan ? <div className={styles.mt12}>
              <label className={styles.label}>
                Plan de la maison (facultatif)
              </label>
              {!selectedPlan ? (
                <div
                  className={`${styles.dropZone}${isDraggingPlan ? " " + styles.dropZoneActive : ""}`}
                  onDragOver={onPlanDragOver}
                  onDragLeave={onPlanDragLeave}
                  onDrop={onPlanDrop}
                  onClick={() => planInputRef.current?.click()}
                  role="button"
                  tabIndex={0}
                  aria-label="Ajouter le plan de la maison"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      planInputRef.current?.click();
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,image/*"
                    className={styles.dropZoneInput}
                    ref={planInputRef}
                    onChange={onPlanChange}
                    tabIndex={-1}
                  />
                  <svg
                    className={styles.dropZoneIcon}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <span className={styles.dropZoneText}>
                    {isDraggingPlan
                      ? "Déposez le plan ici"
                      : "Cliquez ou déposez le plan"}
                  </span>
                  <span className={styles.dropZoneHint}>
                    PDF ou image · 10 Mo max · Utile pour guider l&apos;intervention
                  </span>
                </div>
              ) : (
                <div className={`${styles.fileCard} ${styles.planCard}`}>
                  {selectedPlan.previewUrl ? (
                    <img
                      src={selectedPlan.previewUrl}
                      alt={`Aperçu du plan ${selectedPlan.file.name}`}
                      className={styles.filePreview}
                    />
                  ) : (
                    <div
                      className={`${styles.filePreview} ${styles.filePreviewFallback}`}
                    >
                      PDF
                    </div>
                  )}
                  <span className={styles.fileName}>
                    {selectedPlan.file.name}
                  </span>
                  <button
                    type="button"
                    className={styles.fileRemove}
                    onClick={removePlan}
                  >
                    Retirer
                  </button>
                </div>
              )}
            </div> : null}
          </div>
        ) : null}

        {/* Extras NETTOYAGE */}
        {showNettoyageExtras ? (
          <div className={styles.sectionCard}>
            <div className={styles.sectionTitle}>
              Infos complémentaires — nettoyage
            </div>
            <div className={styles.formGrid2}>
              <div>
                <label className={styles.label}>Contexte</label>
                <select
                  name="contexteNettoyage"
                  className={styles.select}
                  defaultValue="fin-de-bail"
                >
                  <option value="fin-de-bail">
                    Fin de bail / état des lieux
                  </option>
                  <option value="degats-des-eaux">Dégâts des eaux</option>
                  <option value="incendie">Incendie</option>
                  <option value="insalubrite">Insalubrité</option>
                  <option value="squat">Squat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className={styles.label}>Niveau de saleté</label>
                <select
                  name="niveau"
                  className={styles.select}
                  defaultValue="standard"
                >
                  <option value="standard">Standard</option>
                  <option value="intensif">Intensif</option>
                  <option value="extreme">Extrême</option>
                </select>
              </div>
            </div>

            <div className={styles.mt12}>
              <label className={styles.label}>
                Évacuation déchets / encombrants ?
              </label>
              <div className={styles.radioPills} role="radiogroup">
                <label className={styles.radioPill}>
                  <input
                    type="radio"
                    name="evacuation"
                    value="inconnu"
                    defaultChecked
                    className={styles.radioPillInput}
                  />
                  <span>Je ne sais pas</span>
                </label>
                <label className={styles.radioPill}>
                  <input
                    type="radio"
                    name="evacuation"
                    value="oui"
                    className={styles.radioPillInput}
                  />
                  <span>Oui</span>
                </label>
                <label className={styles.radioPill}>
                  <input
                    type="radio"
                    name="evacuation"
                    value="non"
                    className={styles.radioPillInput}
                  />
                  <span>Non</span>
                </label>
              </div>
            </div>
          </div>
        ) : null}

        {/* Photos du problème */}
        <div className={styles.mt14}>
          <label className={styles.label}>Photos du problème</label>
          <div
            className={`${styles.dropZone}${isDraggingPhotos ? " " + styles.dropZoneActive : ""}${selectedPhotos.length >= maxPhotos ? " " + styles.dropZoneDisabled : ""}`}
            onDragOver={onPhotosDragOver}
            onDragLeave={onPhotosDragLeave}
            onDrop={onPhotosDrop}
            onClick={() =>
              selectedPhotos.length < maxPhotos &&
              photosInputRef.current?.click()
            }
            role="button"
            tabIndex={selectedPhotos.length < maxPhotos ? 0 : -1}
            aria-label={
              selectedPhotos.length >= maxPhotos
                ? "Nombre maximum de photos atteint"
                : "Ajouter des photos"
            }
            onKeyDown={(e) => {
              if (
                (e.key === "Enter" || e.key === " ") &&
                selectedPhotos.length < maxPhotos
              ) {
                photosInputRef.current?.click();
              }
            }}
          >
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              className={styles.dropZoneInput}
              ref={photosInputRef}
              onChange={onPhotosChange}
              tabIndex={-1}
            />
            <svg
              className={styles.dropZoneIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
            <span className={styles.dropZoneText}>
              {selectedPhotos.length >= maxPhotos
                ? `${maxPhotos} photos (maximum atteint)`
                : isDraggingPhotos
                ? "Déposez vos photos ici"
                : "Cliquez ou déposez vos photos"}
            </span>
            <span className={styles.dropZoneHint}>
              {selectedPhotos.length > 0
                ? `${selectedPhotos.length} / ${maxPhotos} photo${selectedPhotos.length > 1 ? "s" : ""} sélectionnée${selectedPhotos.length > 1 ? "s" : ""}`
                : `Jusqu'à ${maxPhotos} photos · 8 Mo max · JPG, PNG, WEBP`}
            </span>
          </div>

          {selectedPhotos.length > 0 ? (
            <ul className={styles.fileGrid}>
              {selectedPhotos.map((photo, index) => (
                <li key={photo.id} className={styles.fileCard}>
                  <img
                    src={photo.previewUrl}
                    alt={photo.file.name}
                    className={styles.filePreview}
                  />
                  <span className={styles.fileName}>{photo.file.name}</span>
                  <button
                    type="button"
                    className={styles.fileRemove}
                    onClick={() => removePhoto(index)}
                  >
                    Retirer
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {/* ─── Section 2 : Disponibilités ─── */}
      <div className={styles.formSection}>
        <div className={styles.formSectionHeader}>
          <span className={styles.stepNum} aria-hidden="true">
            2
          </span>
          <span className={styles.stepLabel}>Disponibilités</span>
        </div>

        <div className={styles.mt14}>
          <label className={styles.label}>
            Jours & créneaux *{" "}
            <span className={styles.labelHint}>
              Sélectionnez ce qui vous convient
            </span>
          </label>
          <div className={styles.availabilityBlock}>
            <div className={styles.availabilityRow}>
              <span className={styles.availabilityLabel}>Jours</span>
              <div className={styles.checkPills}>
                {DAYS.map((d) => (
                  <button
                    key={d.value}
                    type="button"
                    className={`${styles.checkPill}${selectedDays.includes(d.value) ? " " + styles.checkPillActive : ""}`}
                    onClick={() => toggleDay(d.value)}
                    aria-pressed={selectedDays.includes(d.value)}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.availabilityRow}>
              <span className={styles.availabilityLabel}>Créneaux</span>
              <div className={styles.checkPills}>
                {HORAIRES.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    className={`${styles.checkPill}${selectedHours.includes(h.value) ? " " + styles.checkPillActive : ""}`}
                    onClick={() => toggleHour(h.value)}
                    aria-pressed={selectedHours.includes(h.value)}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {(selectedDays.length > 0 || selectedHours.length > 0) && (
            <p className={styles.availabilitySummary}>
              {[selectedDays.join(", "), selectedHours.join(", ")]
                .filter(Boolean)
                .join(" — ")}
            </p>
          )}
        </div>
      </div>

      {/* ─── Section 3 : Vos coordonnées ─── */}
      <div className={styles.formSection}>
        <div className={styles.formSectionHeader}>
          <span className={styles.stepNum} aria-hidden="true">
            3
          </span>
          <span className={styles.stepLabel}>Vos coordonnées</span>
        </div>

        <div className={styles.mt14}>
          <label className={styles.label}>Rue et numéro *</label>
          <input
            name="adresseRue"
            required
            className={styles.input}
            placeholder="Rue de l'Église 12"
            autoComplete="street-address"
          />
        </div>
        <div className={`${styles.formGrid2} ${styles.mt10}`}>
          <div>
            <label className={styles.label}>Code postal *</label>
            <input
              name="adresseCodePostal"
              required
              className={styles.input}
              placeholder="1000"
              inputMode="numeric"
              maxLength={4}
              autoComplete="postal-code"
              onChange={(e) => {
                e.target.value = e.target.value.replace(/\D/g, "").slice(0, 4);
              }}
            />
          </div>
          <div>
            <label className={styles.label}>Ville *</label>
            <input
              name="adresseVille"
              required
              className={styles.input}
              placeholder="Bruxelles"
              autoComplete="address-level2"
            />
          </div>
        </div>

        <div className={`${styles.formGrid2} ${styles.mt14}`}>
          <div>
            <label className={styles.label}>Nom & prénom *</label>
            <input
              name="nom"
              required
              className={styles.input}
              autoComplete="name"
            />
          </div>
          <div>
            <label className={styles.label}>Téléphone *</label>
            <input
              name="telephone"
              required
              className={styles.input}
              placeholder="0471 32 57 24"
              value={phoneValue}
              onChange={onPhoneChange}
              inputMode="tel"
              autoComplete="tel"
            />
          </div>
          <div>
            <label className={styles.label}>Email *</label>
            <input
              type="email"
              name="email"
              required
              className={styles.input}
              placeholder="vous@exemple.com"
              autoComplete="email"
            />
          </div>
        </div>
      </div>

      <div className={styles.actionsRow}>
        <button
          type="submit"
          className={styles.btnPrimary}
          disabled={status === "loading"}
        >
          {status === "loading" ? (
            <>
              <svg
                className={styles.spinner}
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeDasharray="50"
                  strokeDashoffset="15"
                  strokeLinecap="round"
                />
              </svg>
              Envoi en cours…
            </>
          ) : (
            "Envoyer la demande"
          )}
        </button>
        <AnimatePresence mode="wait">
          <motion.span
            key={feedback || "default"}
            className={`${styles.lead} ${styles.leadTight}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {feedback
              ? feedback
              : "Réponse rapide. Tarifs clairs annoncés à l'avance."}
          </motion.span>
        </AnimatePresence>
      </div>

      {status === "error" ? (
        <p className={styles.errorText}>
          Si le formulaire ne fonctionne pas, appelez-nous directement.
        </p>
      ) : null}
    </motion.form>
  );
}
