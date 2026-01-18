{
  description = "Dev environment for zestful-frontend2";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";

    # 24.4.1 release
    nodejs-nixpkgs.url = "github:NixOS/nixpkgs/6027c30c8e9810896b92429f0092f624f7b1aace";

    # 24.05 release
    nixpkgs.url = "github:NixOS/nixpkgs/5ed627539ac84809c78b2dd6d26a5cebeb5ae269";

    # 0.147.5 release
    hugo-nixpkgs.url = "github:NixOS/nixpkgs/e0042dedfbc9134ef973f64e5c7f56a38cc5cc97";
  };

  outputs = { self, flake-utils, nodejs-nixpkgs, nixpkgs, hugo-nixpkgs }:
    flake-utils.lib.eachDefaultSystem (system: let
      nodejs = nodejs-nixpkgs.legacyPackages.${system}.nodejs_24;
      python = nixpkgs.legacyPackages.${system}.python3;
      hugo = hugo-nixpkgs.legacyPackages.${system}.hugo;
    in {
      devShells.default = nixpkgs.legacyPackages.${system}.mkShell {
        packages = [
          nodejs
          python
          hugo
        ];

        shellHook = ''
          echo "node" "$(node --version)"
          echo "python" "$(python --version)"
          hugo version
        '';
      };

      formatter = nixpkgs.legacyPackages.${system}.alejandra;
    });
}
