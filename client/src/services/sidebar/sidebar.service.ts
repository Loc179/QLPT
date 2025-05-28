// sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private readonly _isCollapsed = new BehaviorSubject<boolean>(false);
  private readonly _isMobile = new BehaviorSubject<boolean>(false);

  // Observable streams
  public isCollapsed$ = this._isCollapsed.asObservable();
  public isMobile$ = this._isMobile.asObservable();

  constructor() {
    // Initialize based on screen size
    this.initializeState();
  }

  // Getters for current state
  public get isCollapsed(): boolean {
    return this._isCollapsed.value;
  }

  public get isMobile(): boolean {
    return this._isMobile.value;
  }

  // Initialize state based on screen size and saved preferences
  private initializeState(): void {
    // Check if we're on mobile
    this._isMobile.next(window.innerWidth < 768);
    
    // Try to restore saved state from localStorage
    try {
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState !== null) {
        this._isCollapsed.next(JSON.parse(savedState));
      } else {
        // Default to collapsed on mobile, expanded on desktop
        this._isCollapsed.next(window.innerWidth < 768);
      }
    } catch (error) {
      console.error('Error loading sidebar state:', error);
      this._isCollapsed.next(window.innerWidth < 768);
    }
  }

  // Toggle sidebar state
  public toggleSidebar(): void {
    const newState = !this._isCollapsed.value;
    this.setCollapsed(newState);
  }

  // Set collapsed state explicitly
  public setCollapsed(collapsed: boolean): void {
    this._isCollapsed.next(collapsed);
    this.saveState();
  }

  // Toggle mobile state
  public switchMobile(): void {
    const isMobile = window.innerWidth < 768;
    this._isMobile.next(isMobile);
    
    // Auto-adjust collapsed state based on screen size
    if (isMobile && !this._isCollapsed.value) {
      // Don't auto-collapse on mobile switch, let user decide
      // this.setCollapsed(true);
    }
  }

  // Collapse sidebar (useful for mobile navigation)
  public collapse(): void {
    this.setCollapsed(true);
  }

  // Expand sidebar
  public expand(): void {
    this.setCollapsed(false);
  }

  // Save current state to localStorage
  private saveState(): void {
    try {
      localStorage.setItem('sidebar-collapsed', JSON.stringify(this._isCollapsed.value));
    } catch (error) {
      console.error('Error saving sidebar state:', error);
    }
  }

  // Reset to default state
  public reset(): void {
    this._isCollapsed.next(false);
    this._isMobile.next(window.innerWidth < 768);
    this.saveState();
  }

  // Get current state as object (useful for debugging)
  public getState(): { isCollapsed: boolean; isMobile: boolean } {
    return {
      isCollapsed: this._isCollapsed.value,
      isMobile: this._isMobile.value
    };
  }
}