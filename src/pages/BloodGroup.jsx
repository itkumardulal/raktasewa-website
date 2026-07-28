/*  src/pages/BloodGroup.jsx — interactive compatibility learning */
import React, { useCallback, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { brand } from "../constants/brand";
import { useLanguage } from "../i18n/LanguageContext";
import Seo from "../components/Seo";
import SectionTitle from "../components/SectionTitle";
import { cardSx } from "../constants/ui";

const TYPES = ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"];

const COMPAT = {
  "A+": { donate: ["A+", "AB+"], receive: ["A+", "A-", "O+", "O-"] },
  "O+": { donate: ["O+", "A+", "B+", "AB+"], receive: ["O+", "O-"] },
  "B+": { donate: ["B+", "AB+"], receive: ["B+", "B-", "O+", "O-"] },
  "AB+": { donate: ["AB+"], receive: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"] },
  "A-": { donate: ["A-", "A+", "AB-", "AB+"], receive: ["A-", "O-"] },
  "O-": { donate: ["A+", "O+", "B+", "AB+", "A-", "O-", "B-", "AB-"], receive: ["O-"] },
  "B-": { donate: ["B-", "B+", "AB-", "AB+"], receive: ["B-", "O-"] },
  "AB-": { donate: ["AB-", "AB+"], receive: ["AB-", "A-", "B-", "O-"] },
};

const TYPE_COLORS = {
  "A+": "#DC2626",
  "A-": "#F87171",
  "B+": "#2563EB",
  "B-": "#60A5FA",
  "AB+": "#7C3AED",
  "AB-": "#A78BFA",
  "O+": "#059669",
  "O-": "#34D399",
};

function formatList(list, everyoneLabel) {
  if (list.length === TYPES.length) return everyoneLabel;
  return list.join("  ");
}

function canDonate(donor, patient) {
  return COMPAT[donor].donate.includes(patient);
}

function randomPair() {
  const donor = TYPES[Math.floor(Math.random() * TYPES.length)];
  const patient = TYPES[Math.floor(Math.random() * TYPES.length)];
  return { donor, patient };
}

function fillTemplate(str, map) {
  return String(str || "").replace(/\{(\w+)\}/g, (_, k) => map[k] ?? "");
}

export default function BloodGroup() {
  const { t } = useLanguage();
  const everyone = t("bloodGroup.everyone");
  const facts = t("bloodGroup.facts") || [];
  const tips = t("bloodGroup.tips") || [];

  const [selected, setSelected] = useState("O+");
  const [quiz, setQuiz] = useState(() => randomPair());
  const [answered, setAnswered] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const selectedCompat = COMPAT[selected];

  const rows = useMemo(
    () =>
      TYPES.map((type) => ({
        type,
        donate: formatList(COMPAT[type].donate, everyone),
        receive: formatList(COMPAT[type].receive, everyone),
      })),
    [everyone]
  );

  const onAnswer = useCallback(
    (saysYes) => {
      if (answered) return;
      const correct = canDonate(quiz.donor, quiz.patient) === saysYes;
      setAnswered({ correct, saysYes });
      setAttempts((n) => n + 1);
      if (correct) {
        setScore((s) => s + 1);
        setStreak((s) => s + 1);
      } else {
        setStreak(0);
      }
    },
    [answered, quiz]
  );

  const nextQuestion = () => {
    setQuiz(randomPair());
    setAnswered(null);
  };

  const resetQuiz = () => {
    setScore(0);
    setStreak(0);
    setAttempts(0);
    setQuiz(randomPair());
    setAnswered(null);
  };

  return (
    <Box sx={{ bgcolor: brand.surface, pb: 2 }}>
      <Seo
        title={t("bloodGroup.title")}
        description={t("bloodGroup.subtitle")}
        path="/blood-group"
      />

      <Container maxWidth="lg" className="section-pad" sx={{ px: 2 }}>
        <SectionTitle
          component="h1"
          variant="h1"
          eyebrow={t("bloodGroup.eyebrow") || t("nav.bloodGroup")}
          title={t("bloodGroup.title")}
          subtitle={t("bloodGroup.subtitle")}
        />

        {/* Interactive explorer */}
        <Paper
          elevation={0}
          sx={{
            ...cardSx,
            mb: 3,
            "&:hover": { transform: "none", boxShadow: brand.cardShadow },
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <FavoriteBorderIcon color="primary" />
            <Typography variant="h6" component="h2" fontWeight={700}>
              {t("bloodGroup.explorerTitle")}
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 2.5 }}>
            {t("bloodGroup.explorerHint")}
          </Typography>

          <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1 }}>
            {t("bloodGroup.yourType")}
          </Typography>
          <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ mb: 3, gap: 1 }}>
            {TYPES.map((type) => {
              const active = selected === type;
              return (
                <Chip
                  key={type}
                  label={type}
                  onClick={() => setSelected(type)}
                  clickable
                  aria-pressed={active}
                  sx={{
                    fontWeight: 800,
                    fontSize: "0.95rem",
                    height: 40,
                    px: 0.5,
                    bgcolor: active ? TYPE_COLORS[type] : `${TYPE_COLORS[type]}22`,
                    color: active ? "#fff" : brand.ink,
                    border: `2px solid ${TYPE_COLORS[type]}`,
                    transition: "transform 0.15s ease",
                    "&:hover": { transform: "translateY(-2px)" },
                  }}
                />
              );
            })}
          </Stack>

          {selectedCompat ? (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    height: "100%",
                    borderRadius: 2.5,
                    border: `1px solid ${brand.line}`,
                    background: `linear-gradient(160deg, ${TYPE_COLORS[selected]}18, transparent 60%)`,
                  }}
                >
                  <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                    {t("bloodGroup.canDonateTo")}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ gap: 1 }}>
                    {selectedCompat.donate.map((g) => (
                      <Chip
                        key={`d-${g}`}
                        label={g}
                        sx={{
                          fontWeight: 700,
                          bgcolor: TYPE_COLORS[g],
                          color: "#fff",
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    height: "100%",
                    borderRadius: 2.5,
                    border: `1px solid ${brand.line}`,
                    background: `linear-gradient(160deg, ${brand.accent}14, transparent 60%)`,
                  }}
                >
                  <Typography fontWeight={700} sx={{ mb: 1.5 }}>
                    {t("bloodGroup.canReceiveFrom")}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} sx={{ gap: 1 }}>
                    {selectedCompat.receive.map((g) => (
                      <Chip
                        key={`r-${g}`}
                        label={g}
                        variant="outlined"
                        sx={{
                          fontWeight: 700,
                          borderColor: TYPE_COLORS[g],
                          color: TYPE_COLORS[g],
                        }}
                      />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Typography color="text.secondary">{t("bloodGroup.selectPrompt")}</Typography>
          )}
        </Paper>

        {/* Quiz */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2.25, md: 3 },
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${brand.line}`,
            bgcolor: brand.white,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
            <QuizOutlinedIcon color="primary" />
            <Typography variant="h6" component="h2" fontWeight={700}>
              {t("bloodGroup.quizTitle")}
            </Typography>
          </Stack>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {t("bloodGroup.quizSubtitle")}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2.5 }} flexWrap="wrap" useFlexGap>
            <Chip
              color="primary"
              label={`${t("bloodGroup.quizScore")}: ${score}${attempts ? ` / ${attempts}` : ""}`}
              sx={{ fontWeight: 700 }}
            />
            <Chip
              label={`${t("bloodGroup.quizStreak")}: ${streak}`}
              sx={{ fontWeight: 700, bgcolor: brand.accentSoft, color: brand.accent }}
            />
          </Stack>

          <Box
            sx={{
              p: 2.5,
              mb: 2,
              borderRadius: 2.5,
              bgcolor: brand.surface,
              border: `1px solid ${brand.line}`,
              textAlign: "center",
            }}
          >
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
              sx={{ mb: 2 }}
            >
              <Chip
                label={quiz.donor}
                sx={{ fontWeight: 800, fontSize: "1.1rem", height: 44, bgcolor: TYPE_COLORS[quiz.donor], color: "#fff" }}
              />
              <Typography fontWeight={700} color="text.secondary">
                →
              </Typography>
              <Chip
                label={quiz.patient}
                sx={{
                  fontWeight: 800,
                  fontSize: "1.1rem",
                  height: 44,
                  bgcolor: "#fff",
                  border: `2px solid ${TYPE_COLORS[quiz.patient]}`,
                  color: TYPE_COLORS[quiz.patient],
                }}
              />
            </Stack>
            <Typography fontWeight={600}>
              {fillTemplate(t("bloodGroup.quizQuestion"), {
                donor: quiz.donor,
                patient: quiz.patient,
              })}
            </Typography>
          </Box>

          {!answered ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                fullWidth
                variant="contained"
                color="success"
                size="large"
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => onAnswer(true)}
              >
                {t("bloodGroup.quizYes")}
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                size="large"
                startIcon={<CancelOutlinedIcon />}
                onClick={() => onAnswer(false)}
              >
                {t("bloodGroup.quizNo")}
              </Button>
            </Stack>
          ) : (
            <Box>
              <Alert severity={answered.correct ? "success" : "warning"} sx={{ mb: 2 }}>
                <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                  {answered.correct ? t("bloodGroup.quizCorrect") : t("bloodGroup.quizWrong")}
                </Typography>
                {fillTemplate(
                  canDonate(quiz.donor, quiz.patient)
                    ? t("bloodGroup.quizExplainYes")
                    : t("bloodGroup.quizExplainNo"),
                  { donor: quiz.donor, patient: quiz.patient }
                )}
              </Alert>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                <Button variant="contained" onClick={nextQuestion}>
                  {t("bloodGroup.quizNext")}
                </Button>
                <Button variant="text" onClick={resetQuiz}>
                  {t("bloodGroup.quizReset")}
                </Button>
              </Stack>
            </Box>
          )}
        </Paper>

        {/* Facts */}
        <Typography variant="h6" component="h2" fontWeight={700} sx={{ mb: 2 }}>
          {t("bloodGroup.keyFactsTitle")}
        </Typography>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {(Array.isArray(facts) ? facts : []).map((fact) => (
            <Grid key={fact.title} size={{ xs: 12, sm: 6 }}>
              <Paper
                elevation={0}
                sx={{ p: 2.5, height: "100%", borderRadius: 3, border: `1px solid ${brand.line}`, bgcolor: brand.white }}
              >
                <Typography fontWeight={700} sx={{ mb: 0.75 }}>
                  {fact.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {fact.body}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Tips */}
        <Paper
          elevation={0}
          sx={{
            p: 2.5,
            mb: 3,
            borderRadius: 3,
            border: `1px solid ${brand.line}`,
            bgcolor: brand.accentSoft,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
            <LightbulbOutlinedIcon sx={{ color: brand.accent }} />
            <Typography fontWeight={700}>{t("bloodGroup.tipsTitle")}</Typography>
          </Stack>
          <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
            {(Array.isArray(tips) ? tips : []).map((tip) => (
              <Typography component="li" key={tip} variant="body2" color="text.secondary" sx={{ mb: 0.75 }}>
                {tip}
              </Typography>
            ))}
          </Box>
        </Paper>

        {/* Reference table */}
        <Typography variant="h6" component="h2" fontWeight={700} sx={{ mb: 0.5 }}>
          {t("bloodGroup.referenceTitle")}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          {t("bloodGroup.referenceSubtitle")}
        </Typography>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: 3, border: `1px solid ${brand.line}`, overflow: "hidden", mb: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={3}
                  sx={{
                    bgcolor: brand.primary,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1rem",
                    textAlign: "center",
                    py: 1.5,
                  }}
                >
                  {t("bloodGroup.tableBanner")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: 700, py: 1.2 }}>{t("bloodGroup.colType")}</TableCell>
                <TableCell sx={{ fontWeight: 700, py: 1.2 }}>{t("bloodGroup.colDonate")}</TableCell>
                <TableCell sx={{ fontWeight: 700, py: 1.2 }}>{t("bloodGroup.colReceive")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(({ type, donate, receive }) => (
                <TableRow
                  key={type}
                  hover
                  selected={selected === type}
                  onClick={() => setSelected(type)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell sx={{ fontWeight: 700, color: TYPE_COLORS[type], py: 1.1 }}>
                    {type}
                  </TableCell>
                  <TableCell sx={{ py: 1.1 }}>{donate}</TableCell>
                  <TableCell sx={{ py: 1.1 }}>{receive}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
}
