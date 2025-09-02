#!/data/data/com.termux/files/usr/bin/bash
# === ZAIN Key Generator for Termux ===
# Usage: ./addkey.sh KEYNAME DAYS
# Example: ./addkey.sh VIP123 7

KEY=$1
DAYS=$2

# Check dependencies
if ! command -v jq &> /dev/null
then
  echo "Installing jq..."
  pkg install -y jq
fi

# Check arguments
if [ -z "$KEY" ] || [ -z "$DAYS" ]; then
  echo "❌ Usage: ./addkey.sh KEYNAME DAYS"
  exit 1
fi

# Expiry date
EXP=$(date -d "+$DAYS days" +"%Y-%m-%d")

# If keys.json does not exist, create it
if [ ! -f keys.json ]; then
  echo "{}" > keys.json
fi

# Add or update key in keys.json
jq ". + {\"$KEY\": {\"expires\": \"$EXP\"}}" keys.json > tmp.json && mv tmp.json keys.json

# Commit and push to GitHub
git add keys.json
git commit -m "Added/Updated key $KEY ($DAYS days, expires $EXP)"
git push

echo "✅ Key $KEY added/updated, valid until $EXP"
