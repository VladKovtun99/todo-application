// src/app/services/google-calendar.service.ts
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { GoogleEventDetails, GoogleApiResponse } from '../models/google-calendar.model';

declare var gapi: any;
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleCalendarService {
  private tokenClient: any;
  private gapiInitialized = false;
  private gisInitialized = false;

  constructor() {
    // Load the Google API scripts in the constructor
    this.loadGoogleApiScripts();
  }

  /**
   * Load the necessary Google API scripts
   */
  private loadGoogleApiScripts(): void {
    // Create and add the Google API script
    const gapiScript = document.createElement('script');
    gapiScript.src = 'https://apis.google.com/js/api.js';
    gapiScript.async = true;
    gapiScript.defer = true;
    gapiScript.onload = () => this.onGapiLoaded();
    document.head.appendChild(gapiScript);

    // Create and add the Google Identity Services script
    const gisScript = document.createElement('script');
    gisScript.src = 'https://accounts.google.com/gsi/client';
    gisScript.async = true;
    gisScript.defer = true;
    gisScript.onload = () => this.onGisLoaded();
    document.head.appendChild(gisScript);
  }

  /**
   * Initialize GAPI when loaded
   */
  private onGapiLoaded(): void {
    gapi.load('client', () => this.initializeGapiClient());
  }

  /**
   * Initialize GAPI client
   */
  private async initializeGapiClient(): Promise<void> {
    try {
      await gapi.client.init({
        apiKey: environment.googleApi.apiKey,
        discoveryDocs: [environment.googleApi.discoveryDoc],
      });
      this.gapiInitialized = true;
      console.log('Google API client initialized');
    } catch (error) {
      console.error('Error initializing Google API client:', error);
    }
  }

  /**
   * Initialize GIS when loaded
   */
  private onGisLoaded(): void {
    this.tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: environment.googleApi.clientId,
      scope: environment.googleApi.scopes,
      callback: '', // Will be set when needed
    });
    this.gisInitialized = true;
    console.log('Google Identity Services initialized');
  }

  /**
   * Check if all Google APIs are initialized
   */
  private isInitialized(): boolean {
    if (!this.gapiInitialized || !this.gisInitialized) {
      console.warn('Google APIs not yet initialized');
      return false;
    }
    return true;
  }

  /**
   * Create a Google Calendar event
   * @param eventDetails - The details of the event to create
   * @returns Promise with the event link
   */
  public createEvent(eventDetails: GoogleEventDetails): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.isInitialized()) {
        reject('Google APIs not initialized');
        return;
      }

      this.tokenClient.callback = async (response: any) => {
        if (response.error !== undefined) {
          reject(response.error);
          return;
        }

        try {
          const eventLink = await this.scheduleEvent(eventDetails);
          resolve(eventLink);
        } catch (error) {
          reject(error);
        }
      };

      if (gapi.client.getToken() === null) {
        // Request a new token
        this.tokenClient.requestAccessToken({ prompt: 'consent' });
      } else {
        // Reuse an existing token
        this.tokenClient.requestAccessToken({ prompt: '' });
      }
    });
  }

  /**
   * Schedule an event in Google Calendar
   * @param eventDetails - The details of the event to schedule
   * @returns Promise with the event link
   */
  private scheduleEvent(eventDetails: GoogleEventDetails): Promise<string> {
    return new Promise((resolve, reject) => {
      const event = {
        summary: eventDetails.summary,
        location: eventDetails.location || 'Wroclaw, Poland',
        description: eventDetails.description,
        start: {
          dateTime: eventDetails.startTime,
          timeZone: 'Europe/Warsaw',
        },
        end: {
          dateTime: eventDetails.endTime,
          timeZone: 'Europe/Warsaw',
        },
        recurrence: ['RRULE:FREQ=DAILY;COUNT=2'],
        attendees: [{ email: eventDetails.email }],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      };

      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });

      request.execute((response: GoogleApiResponse) => {
        if (response.error) {
          reject(response.error);
          return;
        }

        if (response.htmlLink) {
          // Open the link in a new tab
          window.open(response.htmlLink, '_blank');
          console.info('Event created: ' + response.htmlLink);
          resolve(response.htmlLink);
        } else {
          reject('Failed to create event - no link returned');
        }
      });
    });
  }
}
