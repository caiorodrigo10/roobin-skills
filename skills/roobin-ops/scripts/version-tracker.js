#!/usr/bin/env node

/**
 * Version Tracker Module
 *
 * Tracks semantic versioning for projects, analyzes commits
 * to recommend version bumps, and manages version history.
 *
 * @module version-tracker
 * @version 1.0.0
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * Version bump types
 * @enum {string}
 */
const BumpType = {
  MAJOR: 'major',
  MINOR: 'minor',
  PATCH: 'patch',
};

/**
 * Commit type to bump mapping
 */
const COMMIT_TYPE_BUMP = {
  // Breaking changes -> MAJOR
  'BREAKING CHANGE': BumpType.MAJOR,
  'breaking': BumpType.MAJOR,

  // New features -> MINOR
  'feat': BumpType.MINOR,
  'feature': BumpType.MINOR,

  // Bug fixes -> PATCH
  'fix': BumpType.PATCH,
  'bugfix': BumpType.PATCH,
  'hotfix': BumpType.PATCH,

  // Other changes -> PATCH
  'chore': BumpType.PATCH,
  'docs': BumpType.PATCH,
  'style': BumpType.PATCH,
  'refactor': BumpType.PATCH,
  'perf': BumpType.PATCH,
  'test': BumpType.PATCH,
  'ci': BumpType.PATCH,
  'build': BumpType.PATCH,
};

/**
 * Parse semantic version string
 *
 * @param {string} version - Version string (e.g., "1.2.3" or "v1.2.3")
 * @returns {Object} Parsed version object
 */
function parseVersion(version) {
  const cleaned = version.replace(/^v/, '');
  const match = cleaned.match(/^(\d+)\.(\d+)\.(\d+)(-([a-zA-Z0-9.-]+))?(\+([a-zA-Z0-9.-]+))?$/);

  if (!match) {
    return null;
  }

  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    prerelease: match[5] || null,
    buildmeta: match[7] || null,
    raw: version,
  };
}

/**
 * Format version object to string
 *
 * @param {Object} version - Version object
 * @param {boolean} [includeV=true] - Include 'v' prefix
 * @returns {string} Formatted version string
 */
function formatVersion(version, includeV = true) {
  let str = `${version.major}.${version.minor}.${version.patch}`;

  if (version.prerelease) {
    str += `-${version.prerelease}`;
  }

  if (version.buildmeta) {
    str += `+${version.buildmeta}`;
  }

  return includeV ? `v${str}` : str;
}

/**
 * Bump version by type
 *
 * @param {Object} version - Current version object
 * @param {string} bumpType - Type of bump (major, minor, patch)
 * @returns {Object} New version object
 */
function bumpVersion(version, bumpType) {
  const newVersion = { ...version, prerelease: null, buildmeta: null };

  switch (bumpType) {
    case BumpType.MAJOR:
      newVersion.major += 1;
      newVersion.minor = 0;
      newVersion.patch = 0;
      break;
    case BumpType.MINOR:
      newVersion.minor += 1;
      newVersion.patch = 0;
      break;
    case BumpType.PATCH:
      newVersion.patch += 1;
      break;
  }

  return newVersion;
}

/**
 * Get current version from package.json
 *
 * @param {string} projectRoot - Project root directory
 * @returns {Object|null} Version object or null
 */
function getCurrentVersion(projectRoot) {
  const packagePath = path.join(projectRoot, 'package.json');

  if (!fs.existsSync(packagePath)) {
    return null;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    return parseVersion(pkg.version || '0.0.0');
  } catch (error) {
    return null;
  }
}

/**
 * Get latest git tag
 *
 * @param {string} projectRoot - Project root directory
 * @returns {string|null} Latest tag or null
 */
function getLatestTag(projectRoot) {
  try {
    const tag = execSync('git describe --tags --abbrev=0 2>/dev/null', {
      cwd: projectRoot,
      encoding: 'utf8',
    }).trim();
    return tag;
  } catch {
    return null;
  }
}

/**
 * Get all git tags sorted by version
 *
 * @param {string} projectRoot - Project root directory
 * @returns {string[]} List of tags
 */
function getAllTags(projectRoot) {
  try {
    const output = execSync('git tag -l "v*" --sort=-v:refname 2>/dev/null', {
      cwd: projectRoot,
      encoding: 'utf8',
    });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    return [];
  }
}

/**
 * Get commits since a tag
 *
 * @param {string} projectRoot - Project root directory
 * @param {string} [sinceTag] - Tag to get commits since (or all if not provided)
 * @returns {Object[]} List of commit objects
 */
function getCommitsSince(projectRoot, sinceTag) {
  try {
    const range = sinceTag ? `${sinceTag}..HEAD` : 'HEAD';
    const format = '%H|%s|%b|||';

    const output = execSync(`git log ${range} --pretty=format:"${format}" 2>/dev/null`, {
      cwd: projectRoot,
      encoding: 'utf8',
    });

    const commits = output.split('|||').filter(Boolean).map(entry => {
      const [hash, subject, body] = entry.trim().split('|');
      return { hash, subject, body: body || '' };
    });

    return commits;
  } catch {
    return [];
  }
}

/**
 * Analyze commit message for type
 *
 * @param {string} message - Commit message
 * @returns {string|null} Commit type
 */
function analyzeCommitType(message) {
  // Check for breaking change indicator
  if (message.includes('BREAKING CHANGE') || message.includes('!:')) {
    return 'BREAKING CHANGE';
  }

  // Check for conventional commit prefix
  const match = message.match(/^(\w+)(\(.+\))?!?:/);
  if (match) {
    return match[1].toLowerCase();
  }

  return null;
}

/**
 * Recommend version bump based on commits
 *
 * @param {Object[]} commits - List of commits
 * @returns {Object} Recommendation object
 */
function recommendBump(commits) {
  const analysis = {
    breaking: 0,
    features: 0,
    fixes: 0,
    other: 0,
    commits: commits.length,
  };

  let recommendedBump = BumpType.PATCH;

  for (const commit of commits) {
    const type = analyzeCommitType(commit.subject + '\n' + commit.body);

    if (!type) {
      analysis.other++;
      continue;
    }

    const bump = COMMIT_TYPE_BUMP[type];

    if (bump === BumpType.MAJOR) {
      analysis.breaking++;
      recommendedBump = BumpType.MAJOR;
    } else if (bump === BumpType.MINOR && recommendedBump !== BumpType.MAJOR) {
      analysis.features++;
      recommendedBump = BumpType.MINOR;
    } else if (bump === BumpType.PATCH) {
      if (type === 'fix' || type === 'bugfix' || type === 'hotfix') {
        analysis.fixes++;
      } else {
        analysis.other++;
      }
    }
  }

  return {
    recommended: recommendedBump,
    analysis,
  };
}

/**
 * Generate version report
 *
 * @param {string} projectRoot - Project root directory
 * @returns {Object} Version report
 */
function generateReport(projectRoot) {
  const currentVersion = getCurrentVersion(projectRoot);
  const latestTag = getLatestTag(projectRoot);
  const allTags = getAllTags(projectRoot);
  const commits = getCommitsSince(projectRoot, latestTag);
  const recommendation = recommendBump(commits);

  const report = {
    current: currentVersion ? formatVersion(currentVersion, false) : '0.0.0',
    latestTag: latestTag || 'none',
    tagCount: allTags.length,
    commitsSinceTag: commits.length,
    recommendation: recommendation.recommended,
    analysis: recommendation.analysis,
  };

  if (currentVersion) {
    const newVersion = bumpVersion(currentVersion, recommendation.recommended);
    report.suggestedVersion = formatVersion(newVersion, true);
  }

  return report;
}

/**
 * Format report for console output
 *
 * @param {Object} report - Version report
 * @returns {string} Formatted output
 */
function formatReport(report) {
  const lines = [];

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('  Version Analysis Report');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  lines.push('');
  lines.push(`  Current version:  ${report.current}`);
  lines.push(`  Latest tag:       ${report.latestTag}`);
  lines.push(`  Total tags:       ${report.tagCount}`);
  lines.push('');
  lines.push(`  Commits since tag: ${report.commitsSinceTag}`);
  lines.push('');
  lines.push('  Commit Analysis:');
  lines.push(`    Breaking changes: ${report.analysis.breaking}`);
  lines.push(`    New features:     ${report.analysis.features}`);
  lines.push(`    Bug fixes:        ${report.analysis.fixes}`);
  lines.push(`    Other:            ${report.analysis.other}`);
  lines.push('');
  lines.push(`  Recommended bump:   ${report.recommendation.toUpperCase()}`);

  if (report.suggestedVersion) {
    lines.push(`  Suggested version:  ${report.suggestedVersion}`);
  }

  lines.push('');
  lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  return lines.join('\n');
}

/**
 * Update version in package.json
 *
 * @param {string} projectRoot - Project root directory
 * @param {string} newVersion - New version string
 * @returns {boolean} Success
 */
function updatePackageVersion(projectRoot, newVersion) {
  const packagePath = path.join(projectRoot, 'package.json');

  if (!fs.existsSync(packagePath)) {
    return false;
  }

  try {
    const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    pkg.version = newVersion.replace(/^v/, '');
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
    return true;
  } catch {
    return false;
  }
}

/**
 * CLI handler
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help')) {
    console.log(`
Version Tracker - Semantic Version Management

Usage:
  node version-tracker.js [options]

Options:
  --json        Output as JSON
  --bump        Show recommended bump only
  --update      Update package.json with recommended version
  --help        Show this help message

Examples:
  node version-tracker.js              # Show version report
  node version-tracker.js --json       # Output as JSON
  node version-tracker.js --bump       # Show only recommended bump
  node version-tracker.js --update     # Update package.json
    `);
    return;
  }

  const projectRoot = process.cwd();
  const report = generateReport(projectRoot);

  if (args.includes('--json')) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (args.includes('--bump')) {
    console.log(report.recommendation);
    return;
  }

  if (args.includes('--update')) {
    if (report.suggestedVersion) {
      const success = updatePackageVersion(projectRoot, report.suggestedVersion);
      if (success) {
        console.log(`Updated package.json to version ${report.suggestedVersion}`);
      } else {
        console.error('Failed to update package.json');
        process.exit(1);
      }
    } else {
      console.error('No suggested version available');
      process.exit(1);
    }
    return;
  }

  console.log(formatReport(report));
}

// Export for programmatic use
module.exports = {
  parseVersion,
  formatVersion,
  bumpVersion,
  getCurrentVersion,
  getLatestTag,
  getAllTags,
  getCommitsSince,
  analyzeCommitType,
  recommendBump,
  generateReport,
  updatePackageVersion,
  BumpType,
  COMMIT_TYPE_BUMP,
};

// Run CLI if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('Error:', error.message);
    process.exit(1);
  });
}
