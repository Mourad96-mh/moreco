import type { Locale } from './config';
import fr from './dictionaries/fr.json';
import en from './dictionaries/en.json';
import es from './dictionaries/es.json';
import nl from './dictionaries/nl.json';
import ar from './dictionaries/ar.json';

/** French is the source language: every other file mirrors its shape. */
export type Dictionary = typeof fr;

const DICTIONARIES: Record<Locale, Dictionary> = { fr, en, es, nl, ar };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
